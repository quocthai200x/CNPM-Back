import express  from "express";
const Router = express.Router();
import Controllers from "./controller"

Router.get('/',Controllers.getAll)
        .post('/',Controllers.createAward)
        .put('/update-image-rank',Controllers.updateImageRank)
        .get('/get-all-award-detail',Controllers.getAllAwardDetail)
        .put('/add-gifts',Controllers.addGift)
        .put('/submit-award',Controllers.submitAward)
        .put('/award-done',Controllers.updateAwardDone)





module.exports = Router;
