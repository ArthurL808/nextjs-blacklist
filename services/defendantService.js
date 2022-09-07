import prisma from "../prisma/prisma";


export const getDefendants = async () => {
    const defendants = await prisma.defendant.findMany({
        include:{
            user: {
                select: {
                    name: true
                }
            }
        }
    })
    return defendants
}

export const addDefendant = async (data) => {
    const defendant = await prisma.defendant.create({
        data: data,
        include:{
            user: {
                select: {
                    name: true
                }
            }
        }
    })
    return defendant
}

export const removeDefendant = async (id) => {
    const deletedDefendant = await prisma.defendant.delete({
        where: {id: id}
    })
    return deletedDefendant
}

export const editDefendant = async (data) => {
    const editedDefendant = await prisma.defendant.update({
        where:{ id:data.id},
        data: data,
        include:{
            user: {
                select: {
                    name: true
                }
            }
        }
    })
    return editedDefendant
}