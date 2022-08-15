import prisma from "../../../prisma/prisma"

const convertFeetToInches = (feet,inches) => {
    return Number(feet) * 12 + Number(inches)
}

export default async function handler(req,res) {
    try {
        if(req.method === "GET"){
        const defendantList = await prisma.defendant.findMany()
        res.status(200).json(defendantList)
    }else if(req.method === "POST"){
    const data = req.body    
    const height = convertFeetToInches(req.body.feet, req.body.inches)
    delete data.feet;
    delete data.inches
    data.height = height;
    const defendant = await prisma.defendant.create({
        data: data
    })
        res.status(200).json(defendant)
    }
        }catch(err){
            console.error(err)
        }
}