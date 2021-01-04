import homeModel from "../../../models/homeModel";
import { codeSucess, codeFail, codeFailCreated, codeCreateExisted} from "../../../constants/codeRes"

export class AuthService {
    async login(req,res){
        const { username,password } = req.body;
        try{
            const homeFound = await homeModel.findOne({username, password});
            if(homeFound){
                return res.json({...codeSucess,data:homeFound});
            }
            res.json(codeFail);
        }catch(e){
            res.json({
                ...codeFail,
                error: e.message,
            });
        }
    }

    async register(req,res){
        const { username, password, address,host, phonenumber} = req.body
        try{
            const homeFound = await homeModel.findOne({
                username,address,host,phonenumber
            })
            if(homeFound){
                return res.json(codeCreateExisted);
            }
            const homeCreated = await homeModel.create({
                username,password,address,host,
            })
            if(homeCreated){
                return res.json({
                    ...codeSucess,
                    id: homeCreated._id,
                });
            }
            res.json(codeFailCreated);
        }catch(e){
            res.json({
                ...codeFail,
                error: e.message,
            });
        }
    }


}


export default new AuthService;