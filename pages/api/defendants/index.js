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
                if(session.user.id !== req.body.userId){
                    return res.status(401).send('Unauthorized User')
                }
                let newData = {
                    id: req.body.id,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    dob: req.body.dob,
                    height: req.body.height,
                    weight: req.body.weight,
                    gender: req.body.gender,
                    race: req.body.race,
                    reason: req.body.reason,
                }
            const editedDefendant = await editDefendant(newData)
            return res.status(200).json(editedDefendant)
            case "DELETE":
                if(session.user.id !== req.body.userId){
                    return res.status(401).send('Unauthorized User')
                }
            const deletedDefendant = await removeDefendant(req.body.id)
            return res.status(200).json(deletedDefendant)
        }    
    }
    return res.status(401).send('Unauthorized User')
    }catch(err){
        console.error(err)
    }
}