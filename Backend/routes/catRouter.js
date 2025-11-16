import express from 'express';
import { AddCat, GetAllCats, GetCatById,DeleteCat, GetMatingCats, GetAdoptionCats, SearchCatsByType, Filter, getLatestCats, getSomeCats } from '../controllers/CatController.js';
import  {auth}  from '../middleware/auth.js';

import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
const catRouter=express.Router();

catRouter.post('/add',auth,upload.array('images',3),AddCat);

catRouter.get('/all',GetAllCats);

catRouter.get("/getCats",getSomeCats);

catRouter.get('/this/:id',GetCatById);

catRouter.get("/mating",GetMatingCats)

catRouter.get("/adoption",GetAdoptionCats)

catRouter.get("/search",SearchCatsByType)

catRouter.get("/filter",Filter)

catRouter.get("/latest",getLatestCats)

catRouter.delete("/delete/:id",auth,DeleteCat)

export default catRouter;