import feeModel from "../../../models/feeModel";
import feeBillModel from "../../../models/feeBillModel";

import homeModel from "../../../models/homeModel";


import { codeSucess, codeFail, codeFailCreated, codeCreateExisted, codeUpdated, codeParameterInvalid } from "../../../constants/codeRes"

export class FeeService {
 
    async updateFeeDone(req,res){
        const {fee_id} = req.query;
        let listFound;
        let list_bill_not_done = [];
        let is_allBillDone = true; 
        try{
            listFound = await feeBillModel.find({fee: fee_id}).populate('home');
            if(listFound){
                listFound.forEach(e=>{
                    if(!e.isSubmitted){
                        list_bill_not_done.push(e.home)
                        is_allBillDone = false;
                    }
                })
                if(is_allBillDone){
                    const updated = await feeModel.findByIdAndUpdate((fee_id),{
                        isDone: true,
                    },{
                        new:true,
                        lean:true,
                    })
                    if(updated){
                        return res.json({...
                            codeSucess,
                            data: updated
                        });
                    }
                    return res.json({...
                        codeFail,
                    })
                }
                return res.json({
                    ...codeFail,
                    data: {
                        list_home_id_not_done: list_bill_not_done
                    }
                });
            }
            res.json(codeFail)
        } catch (e) {
            res.json({
                ...codeFail,
                error: e.message,
            })
        }
    }
    async getSubmitted(req, res) {
        try {
            const { id, received } = req.query;
            const feeUpdated = await feeBillModel.findByIdAndUpdate(id,{
                isSubmitted: true,
                received,
            }, {
                new: true,
                lean: true,
            }).populate('home');
            if (feeUpdated) {
                return res.json({
                    ...codeSucess,
                    data: feeUpdated,
                })
            }
            res.json(codeFail)
        } catch (e) {
            res.json({
                ...codeFail,
                error: e,
            })
        }
    }
    async getAllBillByHomeID(req, res) {
        const { home_id } = req.query;
        try {
            const listFound = await feeBillModel.find({ home: home_id })
                .select(["-home"])
                .populate(["fee"])
                .lean();
            if (listFound) {
                return res.json({
                    ...codeSucess,
                    data: listFound
                })
            }
            res.json(codeFail);
        } catch (e) {
            res.json({
                ...codeFail,
                error: e,
            })
        }
    }

    async getAllBillByID(req, res) {
        const { fee_id } = req.query;
        try {
            const listFound = await feeBillModel.find({ fee: fee_id })
                .populate('home')
                .select(["-fee"])
                .lean();
            if (listFound) {
                return res.json({
                    ...codeSucess,
                    data: listFound
                })
            }
            res.json(codeFail);
        } catch (e) {
            res.json({
                ...codeFail,
                error: e,
            })
        }
    }

    async getAllBill(req, res) {
        const { home_id, fee_id } = req.query;
        if(home_id && fee_id){
            return res.json(codeFail);
        }
        try {
            if (home_id) {
                const listFound = await feeBillModel.find({ home: home_id })
                    .select(["-home"])
                    .populate(["fee"])
                    .lean();
                if (listFound) {
                    return res.json({
                        ...codeSucess,
                        data: listFound
                    })
                }
                return res.json(codeFail);
            } else if (fee_id) {
                const listFound = await feeBillModel.find({ fee: fee_id })
                    .populate('home')
                    .select(["-fee"])
                    .lean();
                if (listFound) {
                    return res.json({
                        ...codeSucess,
                        data: listFound
                    })
                }
                return res.json(codeFail);
            }
            const listFound = await feeBillModel.find()
                .populate(['home','fee'])
                .lean();
            if (listFound) {
                return res.json({
                    ...codeSucess,
                    data: listFound
                })
            }
        } catch (e) {
            res.json({
                ...codeFail,
                error: e,
            })
        }
    }
    async getAll(req, res) {
        const {fee_id} = req.query;
        try {
            if(fee_id){
                const feeFound = await feeModel.findById(fee_id);
                if(feeFound){                    
                    return res.json({
                        ...codeSucess,
                        data: feeFound
                    })
                }
                return res.json(codeFail)
            }
            const listFound = await feeModel.find();
            if (listFound) {
                return res.json({
                    ...codeSucess,
                    data: {
                        listFee: listFound,
                    }
                })
            }
            res.json(codeFail);
        } catch (e) {
            res.json({
                ...codeFail,
                error: e.message,
            })
        }
    }
    async createFeeAndSetup(req, res) {
        const { name, type, from, to, price ,isRequired, description } = req.query;
 
        if (!['1', '2'].includes(type) || price <= 0 || !name || new Date(from).valueOf() > new Date(to).valueOf()) {
            return res.json(codeParameterInvalid);
        }
        try {
            const feeFound = await feeModel.findOne({
                name, type, from, to, price, isRequired
            })
            if (feeFound) {
                return res.json(codeCreateExisted);
            }
            let homeIDs = await homeModel.find().select("_id");
            const FeeCreated = await feeModel.create({
                name, type, from, to, price, isRequired, description,
            })
            if (FeeCreated) {
                homeIDs.forEach(async (id) => {
                    let created = await feeBillModel.create({
                        home: id,
                        fee: FeeCreated._id,
                        isSubmitted: false,
                        
                    })
                    if (!created) {
                        let deleteFee = await feeModel.findByIdAndDelete(FeeCreated._id);
                        let delBill = await feeBillModel.findOneAndDelete({ fee: FeeCreated._id });
                        return res.json(codeFail);
                    }
                })
                return res.json({
                    ...codeSucess,
                    data: FeeCreated,
                });
            }
            res.json(codeFail)

        } catch (e) {
            res.json({
                ...codeFail,
                error: e.message,
            })
        }
    }
}


export default new FeeService;