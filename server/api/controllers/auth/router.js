import express  from "express";
const Router = express.Router();
import Controllers from "./controller"

Router.post('/register',Controllers.register)
  .post('/login',Controllers.login)



module.exports = Router;
