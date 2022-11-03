import prisma from "../prisma/prisma";

export const getBounties = () => {
  const bounties = prisma.bounty.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    include: {
      defendant: true,
    },
  });
  return bounties;
};

export const getUsersBounties = () => {
  const usersBounties = prisma.user.findMany({
    include: {
      bounty: {
        include: {
          defendant: true,
        },
      },
    },
  });
  return usersBounties;
};

export const addBounty = async (data) => {
  const bounty = await prisma.defendant.create({
    data: {
      first_name: data.first_name,
      last_name: data.last_name,
      dob: data.dob,
      height: data.height,
      weight: data.weight,
      gender: data.gender,
      race: data.race,
      reason: data.reason,
      userId: data.userId,
      bounty: {
        create: {
          userId: data.userId,
          rewardAmount: data.rewardAmount,
          caseNumber: data.caseNumber,
          lastKnownLocation: data.lastKnownLocation,
          note: data.note,
        },
      },
    },
  });
  return bounty;
};
