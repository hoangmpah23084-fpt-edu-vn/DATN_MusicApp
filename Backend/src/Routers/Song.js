import express from "express";

const Route_Song = express.Router();

Route_Song.get("/Song", (req, res) => {
  res.json({
    message: "Get Thanh cong",
  });
});

export default Route_Song;
