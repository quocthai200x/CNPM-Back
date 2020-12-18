import homeModel from "../../../models/homeModel";
import personModel from "../../../models/personModel";

import { codeSucess, codeFail, codeFailCreated, codeCreateExisted, codeUpdated} from "../../../constants/codeRes"

export class HomeService {
    // async updateHome(req,res){
    //     const {id}
    // }


    async getHome(req, res) {
        const {id} = req.query;
        try{
            const homeFound = await homeModel.findById(id).populate('members');
            if(homeFound){
                return res.json(homeFound);
            }
            res.json(codeFail);
        }catch(error){
            res.json({
                ...codeFail,
                error:error.message,
            })
        }
    }

    async addMembers(req,res){
        const { listID , id} = req.body;;
        try{
            // Lọc id ảo
            let membersNew = listID.filter(async(id)=>
            {
                const personFound = await personModel.findById(id);
                if(personFound){
                    return id;
                }
            }
            )
            // Lấy members đang có sẵn trong db và check trùng
            let membersOld = await homeModel.findById(id).select("members").lean();
            membersOld = membersOld.members.map(e =>{
                return e.toString();
            })
            let members = [... new Set([...membersOld, ...membersNew])]
            
            // UPDATE
            const membersUpdated = await homeModel.findByIdAndUpdate(id,{
                members,
            },{
                new: true,
                lean: true,
            }) 
            if(membersUpdated){
                return res.json({
                    ...codeUpdated,
                    data: {
                        members:membersUpdated.members,
                    }
                })
            }
        }catch(error){
            res.json({
                ...codeFail,
                error:error.message,
            })
        }
        }
}


export default new HomeService;