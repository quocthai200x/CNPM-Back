import express  from "express";
const Router = express.Router();
import Controllers from "./controller"

Router.post('/',Controllers.createFeeAndSetup)
    .get('/get-all-fees',Controllers.getAll)
    .get('/get-all-bills',Controllers.getAllBill)
    // .get('/get-all-bills-by-id',Controllers.getAllBillByID)
    // .get('/get-all-bills-by-home-id',Controllers.getAllBillByHomeID)
    .put('/get-submitted-bill',Controllers.getSubmitted)
    .put('/fee-done',Controllers.updateFeeDone)
    // .put('/',Controllers.updateFee)




module.exports = Router;
