import express  from "express";
const Router = express.Router();
import Controllers from "./controller"

Router.post('/',Controllers.createPerson)
        .get('/',Controllers.getPerson)
        .put('/',Controllers.updatePerson)
        .delete('/',Controllers.deletePerson)



module.exports = Router;
