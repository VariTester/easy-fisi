// backend-scraper/index.js
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const cron = require("node-cron");

const admin = require("firebase-admin");
const serviceAccount = require("./firebaseAdminKey.json");

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
      "https://www.portaltrabajos.pe/search?q=ingeniería+de+sistemas&max-results=12&by-date=true";

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);
    const trabajos = [];

    $('div.blog-posts article').slice(0, 3).each((i, el) => {
      const titulo = $(el).find('h2.post-title a').text().trim();
      const link = $(el).find('h2.post-title a').attr('href');

      // 💡 El img está fuera del h2, y puede estar directamente dentro del <article>
      const imagen =
        $(el).find('img').attr('data-src') || $(el).find('img').attr('src');

      if (titulo && link) {
        trabajos.push({ titulo, link, imagen: imagen || null });
      }
    });

    // 🔄 Borra trabajos anteriores
    const trabajosRef = db.collection("trabajos");
    const snapshot = await trabajosRef.get();
    const batch = db.batch();
    snapshot.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    // 🔁 Subir nuevos trabajos
    for (const trabajo of trabajos) {
      await trabajosRef.add(trabajo);
    }

    console.log("✅ Trabajos actualizados y subidos a Firebase.");
  } catch (error) {
    console.error("❌ Error al actualizar trabajos:", error.message);
  }
}

// 🕒 Ejecuta cada día a las 7:00 am
cron.schedule("0 7 * * *", () => {
  console.log("📅 Ejecutando scraping programado...");
  actualizarTrabajos();
});

// 🚀 Endpoint de consulta manual
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
  actualizarTrabajos(); // Ejecutar al iniciar
});
