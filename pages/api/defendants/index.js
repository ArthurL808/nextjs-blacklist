import {authOptions} from "../auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"
import {getDefendants,addDefendant,editDefendant,removeDefendant} from "../../../services/defendantService"




export default async function handler(req,res) { 
    try {
    const session = await unstable_getServerSession(req,res,authOptions)
    if(session){
        switch(req.method) {
            case "GET":
            const defendants = await getDefendants();
            return res.status(200).json(defendants)
            case "POST":
            const defendant = await addDefendant(req.body)
            return res.status(200).json(defendant)
            case "PUT":
            const editedDefendant = await editDefendant(req.body)
            return res.status(200).json(editedDefendant)
            case "DELETE":
            const deletedDefendant = await removeDefendant(req.body)
            return res.status(200).json(deletedDefendant)
        }    
    }
    return res.status(401).send('Unauthorized User')
    }catch(err){
        console.error(err)
    }
}