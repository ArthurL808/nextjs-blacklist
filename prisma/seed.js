const prisma = require('./prisma');

const load = async ()=>{
   
    
    try{
        await prisma.defendant.deleteMany();
        console.log('Defendant table deleted');
        await prisma.defendant.createMany({
            data: [
                {
                    "userId": "cl78egguf0012q472fbt3kc7g",
                    "first_name": "Rois",
                    "last_name": "Illwell",
                    "dob": "06-09-1955",
                    "height": 77,
                    "weight": 268,
                    "gender": "Female",
                    "race": "Pima",
                    "reason": "needs-based"
                  }, {
                    "userId": "cl78egguf0012q472fbt3kc7g",
                    "first_name": "Kenneth",
                    "last_name": "Lansley",
                    "dob": "05-23-2000",
                    "height": 104,
                    "weight": 175,
                    "gender": "Male",
                    "race": "Asian",
                    "reason": "Open-architected"
                  }, {
                    "userId": "cl78egguf0012q472fbt3kc7g",
                    "first_name": "Jenifer",
                    "last_name": "Peasgood",
                    "dob": "02-01-1962",
                    "height": 104,
                    "weight": 233,
                    "gender": "Female",
                    "race": "Mexican",
                    "reason": "Devolved"
                  }, {
                    "userId": "cl78egguf0012q472fbt3kc7g",
                    "first_name": "Jerrylee",
                    "last_name": "Cocklie",
                    "dob": "06-22-1997",
                    "height": 70,
                    "weight": 127,
                    "gender": "Female",
                    "race": "American Indian",
                    "reason": "zero defect"
                  }, {
                    "userId": "cl78egguf0012q472fbt3kc7g",
                    "first_name": "Adamo",
                    "last_name": "Farthing",
                    "dob": "03-20-1942",
                    "height": 69,
                    "weight": 175,
                    "gender": "Male",
                    "race": "Navajo",
                    "reason": "Expanded"
                  }
            ],
            skipDuplicates: true
        })
        console.log('Defendant table seeded')
    }catch(e){
        console.log(e);
        console.error(e.message);
    }finally{
        await prisma.$disconnect();
    }
}

load();