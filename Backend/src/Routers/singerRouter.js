import { Router } from "express";
import {getSingers,getItem,deleteSinger,updateSinger,createSinger} from '../Controllers/singerController.js'

const SingerRoute = Router();

SingerRoute.get("/singers", getSingers);
SingerRoute.get("/singer/:id", getItem);
SingerRoute.post("/singer",createSinger );
SingerRoute.put("/singer/:id",updateSinger );
SingerRoute.delete("/singer/:id",deleteSinger);

export default SingerRoute;
