import express  from "express";
const Router = express.Router();
import Controllers from "./controller"

Router.get('/',Controllers.getHome)
    .post('/add-members',Controllers.addMembers)




module.exports = Router;
