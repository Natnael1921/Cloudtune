import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.q;

    const response = await axios.get(
      `https://api.deezer.com/search?q=${query}`
    );

    res.json(response.data);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from Deezer" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
