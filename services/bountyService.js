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
