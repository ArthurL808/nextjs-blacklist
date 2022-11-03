const prisma = require("./prisma");

const load = async () => {
  try {
    await prisma.bounty.deleteMany();
    console.log("Bounty table deleted");
    await prisma.defendant.deleteMany();
    console.log("Defendant table deleted");
    await prisma.defendant.createMany({
      data: [
        {
          userId: "cl9ypgtny0010giv5hzb1xvql",
          first_name: "Rois",
          last_name: "Illwell",
          dob: "06-09-1955",
          height: 77,
          weight: 268,
          gender: "Female",
          race: "Pima",
          reason: "needs-based",
        },
        {
          userId: "cl9ypgtny0010giv5hzb1xvql",
          first_name: "Kenneth",
          last_name: "Lansley",
          dob: "05-23-2000",
          height: 104,
          weight: 175,
          gender: "Male",
          race: "Asian",
          reason: "Open-architected",
        },
        {
          userId: "cl9ypgtny0010giv5hzb1xvql",
          first_name: "Jenifer",
          last_name: "Peasgood",
          dob: "02-01-1962",
          height: 104,
          weight: 233,
          gender: "Female",
          race: "Mexican",
          reason: "Devolved",
        },
        {
          userId: "cl9ypgtny0010giv5hzb1xvql",
          first_name: "Jerrylee",
          last_name: "Cocklie",
          dob: "06-22-1997",
          height: 70,
          weight: 127,
          gender: "Female",
          race: "American Indian",
          reason: "zero defect",
        },
        {
          userId: "cl9ypgtny0010giv5hzb1xvql",
          first_name: "Adamo",
          last_name: "Farthing",
          dob: "03-20-1942",
          height: 69,
          weight: 175,
          gender: "Male",
          race: "Navajo",
          reason: "Expanded",
        },
      ],
      skipDuplicates: true,
    });
    console.log("Defendant table seeded");
    await prisma.bounty.createMany({
      data: [
        {
          defendantId: "1a01971c-3674-4032-b6bf-92cbe4f7c194",
          userId: "cl9ypgtny0010giv5hzb1xvql",
          rewardAmount: 4350,
          caseNumber: "1066038392",
          lastKnownLocation: "611 Fairfield Hill",
          note: "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
        },
        {
          defendantId: "1a01971c-3674-4032-b6bf-92cbe4f7c194",
          userId: "cl9ypgtny0010giv5hzb1xvql",
          rewardAmount: 4434,
          caseNumber: "3319999729",
          lastKnownLocation: "64599 Orin Center",
          note: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
        },
        {
          defendantId: "1a01971c-3674-4032-b6bf-92cbe4f7c194",
          userId: "cl9ypgtny0010giv5hzb1xvql",
          rewardAmount: 3313,
          caseNumber: "2649615907",
          lastKnownLocation: "57 Nelson Plaza",
          note: "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
        },
        {
          defendantId: "1a01971c-3674-4032-b6bf-92cbe4f7c194",
          userId: "cla00wxvn00064jv52qmbh1l7",
          rewardAmount: 3313,
          caseNumber: "2649615907",
          lastKnownLocation: "57 Nelson Plaza",
          note: "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
        },
      ],
      skipDuplicates: true,
    });
    console.log("Bounty table seeded");
  } catch (e) {
    console.log(e);
    console.error(e.message);
  } finally {
    await prisma.$disconnect();
  }
};

load();
