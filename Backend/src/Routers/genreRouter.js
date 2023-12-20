import express from "express";
import {
  create_Genre,
  getAll_Genre,
  get_GenreById,
  delete_Genre,
  update_Genre,
  deleteSongInGenre,
} from "../Controllers/genreController.js";
const GenderRouter = express.Router();

GenderRouter.get("/genre", getAll_Genre);
GenderRouter.get("/genre/:id", get_GenreById);
GenderRouter.post("/genre", create_Genre);
GenderRouter.put("/genre/:id", update_Genre);
GenderRouter.delete("/genre/:id", delete_Genre);
GenderRouter.put("/songGenre/:id", deleteSongInGenre);

export default GenderRouter;
