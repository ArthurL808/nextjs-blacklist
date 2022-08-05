import prisma from "../../../prisma/prisma"

export default async function handler(req,res) {
    if(req.method == "GET"){
        try {
        const defendantList = await prisma.defendant.findMany()
        res.status(200).json(defendantList)
        }catch(err){
            console.error(err)
        }
    }
}