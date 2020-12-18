import awardModel from "../../../models/awardModel"
import speicalEventAwardModel from "../../../models/specialEventAwardModel"

import { codeSucess, codeFail, codeFailCreated, codeCreateExisted, codeUpdated, codeParameterInvalid} from "../../../constants/codeRes"
import personModel from "../../../models/personModel";
import endSchoolAwardModel from "../../../models/EndSchoolAwardModel";


const _18years = 568025140000;
const _6years = 189341712000;
const now = Date.now();
const _18yearsFromNow = now - _18years;
const _6yearsFromNow = now - _6years;

const string_6yearsFromNow = new Date(_6yearsFromNow);
const string_18yearsFromNow = new Date(_18yearsFromNow);

export class AwardService {
    async updateAwardDone(req,res){
        const {award_id,type} = req.query;
        let listFound;
        let list_person_not_done = [];
        let is_allAwardDone = true; 
        try{
            if(type === "1"){
                listFound = await speicalEventAwardModel.find({award:award_id}).populate(['home','person']);
            }else if(type === "2"){
                listFound = await endSchoolAwardModel.find({award:award_id}).populate(['home','person']);
            }
           
            if(listFound){
                listFound.forEach(e=>{
                    if(!e.isAwarded){
                        list_person_not_done.push(e.person)
                        is_allAwardDone = false;
                    }
                })
            }
            
            if(is_allAwardDone){
                const updated = await feeModel.findByIdAndUpdate(id,{
                    isDone: true,
                },{
                    new:true,
                    lean:true,
                })
                if(updated){
                    return res.json(codeSucess);
                }
                return res.json({...
                    codeFail,
                })
            }
            res.json({
                ...codeFail,
                data: {
                    list_person_id_not_done: list_person_not_done
                }
            });
        } catch (e) {
            res.json({
                ...codeFail,
                error: e.message,
            })
        }
    }
    async getAllAwardDetail(req,res){
        const {type, award_id, home_id} = req.query;
        let listFound;
        try{
            if(type === "1"){
                listFound = await speicalEventAwardModel.find({award:award_id})
                                                            .populate(['home','person'])
                                                            .sort({'home._id':1});

            }else if(type === "2"){
                listFound = await endSchoolAwardModel.find({award:award_id})
                                                        .populate(['home','person'])
                                                        .sort({'home._id':1});
            }
            if(listFound){
                if(home_id){
                    listFound = listFound.filter(element =>{
                        return element.home._id == home_id
                    })
                }
                return res.json({
                    ...codeSucess,
                    data: listFound
                })
            }
            res.json(codeParameterInvalid);
        }catch(error){
            res.json({
                ...codeFail,
                error,
            })
        }
        
    }

    async addGift(req,res){
        const {id, gifts, type} = req.body;
        try{
            if(type === 1){
                const updated = await speicalEventAwardModel.findByIdAndUpdate(id,{
                    $set:{
                        gifts,
                    }
                },{
                    new: true,lean:true
                })
                if(updated){
                    return res.json({
                        ...codeSucess,
                        data: updated,
                    })
                }
                return res.json(codeFail)
            }
            else if(type === 2){
                const updated = await endSchoolAwardModel.findByIdAndUpdate(id,{
                    $set:{
                       gifts
                    }
                },{
                    new: true,lean:true
                })
                if(updated){
                    return res.json({
                        ...codeSucess,
                        data: updated,
                    })
                }
                return res.json(codeFail)
            }
            res.json(codeParameterInvalid);
        }catch(error){
            res.json({
                ...codeFail,
                error,
            })
        }
    }

    async submitAward(req,res){
        const { id, type } = req.body
        try{
            if(type === 1){
                const updated = await speicalEventAwardModel.findByIdAndUpdate(id,{
                    $set:{
                        isAwarded: true,
                    }
                },{
                    new: true,lean:true
                })
                if(updated){
                    return res.json({
                        ...codeSucess,
                        data: updated,
                    })
                }
                return res.json(codeFail)
            }
            else if(type === 2){
                const updated = await endSchoolAwardModel.findByIdAndUpdate(id,{
                    $set:{
                        isAwarded: true,
                    }
                },{
                    new: true,lean:true
                })
                if(updated){
                    return res.json({
                        ...codeSucess,
                        data: updated,
                    })
                }
                return res.json(codeFail)
            }
            res.json(codeParameterInvalid);
        }catch(error){
            res.json({
                ...codeFail,
                error,
            })
        }
    }

    async updateImageRank(req,res){
        const { image, rank, id} = req.body;
        try{
            const updated = await endSchoolAwardModel.findByIdAndUpdate(id,{
                $set:{
                    image_evidence: image,
                    rank
                }
            },{
                new: true,
                lean: true,
            })
            if(updated){
                return res.json({
                    ...codeSucess,
                    data: updated
                })
            }
            res.json(codeFail)
        }catch(error){
            res.json({
                ...codeFail,
                error,
            })
        }
    }

    async getAll(req,res){
        try{
            const awardsFound = await awardModel.find();
            if(awardsFound){
                return res.json({
                    ...codeSucess,
                    data: awardsFound,
                })
            }
            res.json(codeFail);
        }
        catch(error){
            res.json({
                ...codeFail,
                error,
            })
        }
    }

    async createAward(req,res){
    
    const {name, type, gifts ,from, to , description } = req.body;
        try{
            const exitsed = await awardModel.findOne({name,type})
            if(exitsed){
                return res.json(codeCreateExisted)
            }
            const awardCreated = await awardModel.create({
                name, type, gifts,from, to,description
            })
            if(awardCreated){
                if(type === 1){
                    const listPerson = await personModel.find({
                        dob: {
                            $gt: string_18yearsFromNow,
                            $lt: Date.now(),
                        }
                    }).lean();
                    
                    listPerson.forEach(async (person) =>{
                        let specialCreated = await speicalEventAwardModel.create({
                            award: awardCreated._id,
                            person: person._id,
                            home: person.home,
                        })
                    })
                    return res.json(codeSucess)
                }
                else if(type === 2){
                    const listPerson = await personModel.find({
                        dob: {
                            $gt: string_18yearsFromNow,
                            $lt: string_6yearsFromNow,
                        }
                    }).lean();
        
                    listPerson.forEach(async (person) =>{
                        let endSchoolAwardsCreated = await endSchoolAwardModel.create({
                            award: awardCreated._id,
                            person: person._id,
                            home: person.home,
                        })
                    })
                    return res.json(codeSucess)
                }
                const deleteAward = await speicalEventAwardModel.findByIdAndDelete(awardCreated._id);
                return res.json(codeFail)
            }
            res.json(codeFail)
        }
        catch(error){
            res.json({
                ...codeFail,
                error,
            })
        }
    }

}


export default new AwardService;