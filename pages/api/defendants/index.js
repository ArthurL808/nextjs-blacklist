import prisma from "../../../prisma/prisma"
import {authOptions} from "../auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

const convertFeetToInches = (feet,inches) => {
    return Number(feet) * 12 + Number(inches)
}


export default async function handler(req,res) {
    
    try {
    const session = await unstable_getServerSession(req,res,authOptions)
    if(session){
        if(req.method === "GET"){
            const defendantList = await prisma.defendant.findMany()
            return res.status(200).json(defendantList)
        }else if(req.method === "POST"){
            const data = req.body    
            const height = convertFeetToInches(req.body.feet, req.body.inches)
            delete data.feet;
            delete data.inches
            data.height = height;
            const defendant = await prisma.defendant.create({
                data: data
            })
           return res.status(200).json(defendant)
        }else if(req.method === "DELETE"){
            const deleteDefendant = await prisma.defendant.delete({
                where: { id: req.body}
            })
           return res.status(200).json(deleteDefendant)
        }else if (req.method === "PATCH"){
            const data = req.body
            const height = convertFeetToInches(req.body.feet, req.body.inches)
            delete data.feet
            delete data.inches
            data.height = height
            const editedDefendant = await prisma.defendant.update({
                where:{ id:data.id},
                data: data
            })
          return res.status(200).json(editedDefendant)
        }
    }
    return res.status(401).send('Unauthorized User')
    }catch(err){
        console.error(err)
    }
}