import express from "express";
import axios from "axios";
import cors from "cors";


const app = express();
app.use(cors());
const API_KEY = "AO0Btm42Gh1bcFMfpl2Pp98sgGORaOFP";

let articlesStorage = [];
let countNewArticles = 0;
const LIMIT = 30;

app.get("/api/news", async (req, res) => {
  const {year, month, isUpdate} = req.query;
  try {
    const response = await axios.get(
        `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${API_KEY}`
    );

    const newArticles = response.data.response.docs.reverse();

    if (isUpdate === "T") {
      const existingIds = new Set(articlesStorage.map(article => article._id));
      const onlyNewArticles = newArticles.filter(article => !existingIds.has(article._id));

      if (onlyNewArticles.length > 0) {
        articlesStorage = newArticles;
        countNewArticles += onlyNewArticles.length;
        return res.json({articles: onlyNewArticles});
      }

      return res.json({articles: []});
    }

    articlesStorage = newArticles;
    return res.json({articles: newArticles.slice(0, LIMIT), total: newArticles.length});
  } catch (error) {
    res.status(500)
        .json({error: error.message});
  }
});

app.get("/api/news/path", (req, res) => {
  const {page = 2} = req.query;
  if (articlesStorage.length === 0) {
    return res.status(400)
        .json({error: "Статьи ещё не загружены. Сначала вызовите /api/news"});
  }

  const start = (page - 1) * LIMIT + countNewArticles;
  const end = start + LIMIT;
  const paginatedArticles = articlesStorage.slice(start, end);

  res.status(200)
      .json({
        page: Number(page),
        articles: paginatedArticles,
        total: articlesStorage.length
      });
});

app.listen(5000, () => console.log("Сервер запущен на порту 5000"));
