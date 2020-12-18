import personModel from "../../../models/personModel";
import { codeSucess, codeFail, codeUpdated, codeFailDelete, codeFailUpdated, codeCreateExisted } from "../../../constants/codeRes"

export class PersonService {
    async createPerson(req, res) {
        const { name, dob, home, work_at ,cmnd , gender} = req.query;
        try {
            const personCreated = await personModel.create({
                name,
                dob,
                home,
                work_at,
                cmnd,
                gender,
            })
            if (personCreated) {
                return res.json({
                    ...codeSucess,
                    id: personCreated._id,
                });
            }
            res.json(codeCreateExisted);
        }

        catch (e) {
            res.json({
                ...codeFail,
                error: e,
            })
        }
    }


    async getPerson(req, res) {
        const { id } = req.query;
        try {
            const personFound = await personModel.findById(id);
            if(personFound){
                return res.json({
                    ...codeSucess,
                    data: personFound,
                })
            }
            res.json(codeFail);
        }catch (e) {
            res.json({
                ...codeFail,
                error: e,
            })
        }
    }

    async updatePerson(req,res){
        const {name, dob, home ,id,work_at, cmnd,gender } = req.query;
        try{
            const personUpdated = await personModel.findByIdAndUpdate(id,{$set:
                {
                    name,dob,home,work_at,cmnd,gender
                }
            },{
                new:true,
                lean:true,
            });   
            if(personUpdated){
                return res.json({
                    ...codeUpdated,
                    data: personUpdated,
                });
            }
            res.json(codeFailUpdated);
        }catch(e){
            res.json({
                ...codeFail,
                error: e,
            })
        }
    }



    async deletePerson(req, res) {
        const { id } = req.query;
        try {
            const personDeleted = await personModel.findByIdAndDelete(id);
            if (personDeleted) {
                return res.json(personDeleted);
            }
            res.json(codeFailDelete);
        } catch (e) {
            res.json({
                ...codeFail,
                error: e,
            })
        }
    }
}

export default new PersonService;