require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const cron = require("node-cron");

const admin = require("firebase-admin");

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_KEY_BASE64, "base64").toString("utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
const PORT = 4000;

app.use(cors());

async function actualizarTrabajos() {
  try {
    const url =
      "https://www.portaltrabajos.pe/search?q=Ingeniería+de+sistemas+e+informática&max-results=12&by-date=true";

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);
    const trabajos = [];

    $("div.blog-posts article").each((i, el) => {
      const titulo = $(el).find("h2.post-title a").text().trim();
      const link = $(el).find("h2.post-title a").attr("href");
      const imagen =
        $(el).find("img").attr("data-src") || $(el).find("img").attr("src");

      if (titulo && link) {
        trabajos.push({ titulo, link, imagen: imagen || null });
      }
    });

    // 👉 Solo los 3 primeros
    const trabajosFinales = trabajos.slice(0, 3);

    // 🔄 Elimina trabajos anteriores
    const trabajosRef = db.collection("trabajos");
    const snapshot = await trabajosRef.get();
    const batch = db.batch();
    snapshot.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    // 🔁 Sube solo los 3 nuevos
    for (const trabajo of trabajosFinales) {
      await trabajosRef.add(trabajo);
    }

    console.log("✅ Trabajos actualizados y subidos a Firebase.");
  } catch (error) {
    console.error("❌ Error al actualizar trabajos:", error.message);
  }
}

// 🕒 Programa automático diario a las 7:00 AM (descomenta si lo necesitas)
// cron.schedule("0 7 * * *", () => {
//   console.log("📅 Ejecutando scraping programado...");
//   actualizarTrabajos();
// });

// 🔁 Consulta manual (GET)
app.get("/api/trabajos", async (req, res) => {
  try {
    const trabajosRef = db.collection("trabajos");
    const snapshot = await trabajosRef.get();
    const trabajos = snapshot.docs.map((doc) => doc.data());
    res.json(trabajos);
  } catch (error) {
    console.error("❌ Error al obtener trabajos:", error.message);
    res.status(500).json({ error: "Error al obtener trabajos" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Scraper corriendo en http://localhost:${PORT}/api/trabajos`);
  actualizarTrabajos(); // Ejecutar una vez al iniciar
});

//Para ejecutar el index.js debo entrar a la carpeta donde esta ubicado hacer un
//gitbash y ejeccutar node index.js y luego refrescar la página


