const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());

app.get("/api/trabajos", async (req, res) => {
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

    $('div.blog-posts article').each((i, el) => {
      const titulo = $(el).find('h2.post-title a').text().trim();
      const link = $(el).find('h2.post-title a').attr('href');
      const imagen = $(el).find('img').attr('data-src') || $(el).find('img').attr('src');

      if (titulo && link) {
        trabajos.push({ titulo, link, imagen });
      }
    });

    console.log("✅ Trabajos encontrados:", trabajos.length);
    res.json(trabajos.slice(0, 3)); // Solo los 3 primeros
  } catch (error) {
    console.error("❌ Error al hacer scraping:", error.message);
    res.status(500).json({ error: "Error al hacer scraping" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Scraper corriendo en http://localhost:${PORT}/api/trabajos`);
});
