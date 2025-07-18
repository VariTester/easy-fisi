const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const cheerio = require("cheerio");

admin.initializeApp();
const db = admin.firestore();

exports.actualizarTrabajosDiario = functions.pubsub.schedule("every day 07:00").timeZone("America/Lima").onRun(async (context) => {
  try {
    const url = "https://www.portaltrabajos.pe/search?q=ingeniería+de+sistemas&max-results=12&by-date=true";
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);
    const trabajos = [];

    $('div.blog-posts article').slice(0, 3).each((i, el) => {
      const titulo = $(el).find('h2.post-title a').text().trim();
      const link = $(el).find('h2.post-title a').attr('href');
      const imagen = $(el).find('img').attr('data-src') || $(el).find('img').attr('src');

      if (titulo && link) {
        trabajos.push({ titulo, link, imagen: imagen || null });
      }
    });

    // Borrar trabajos anteriores
    const trabajosRef = db.collection("trabajos");
    const snapshot = await trabajosRef.get();
    const batch = db.batch();
    snapshot.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    // Subir los nuevos trabajos
    for (const trabajo of trabajos) {
      await trabajosRef.add(trabajo);
    }

    console.log("✅ Trabajos actualizados en Firestore.");
    return null;
  } catch (error) {
    console.error("❌ Error en scraping:", error.message);
    return null;
  }
});
