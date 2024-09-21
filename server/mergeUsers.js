const { PrismaClient } = require("@prisma/client");
const { verify } = require("jsonwebtoken");
const prisma = new PrismaClient();

const mergeUsers = async (newUserToken, oldUserToken, SECRET) => {
  try {
    const { id: oldUserId, provider: oldProvider } = verify(oldUserToken, SECRET);
  const { id: newUserId, provider: newProvider } = verify(newUserToken, SECRET);

  if (!oldUserId || !newUserId) return false;
  if (oldUserId === newUserId) return false;

  const oldUser = await prisma.user.findUnique({ where: { id: oldUserId } });
  const newUser = await prisma.user.findUnique({ where: { id: newUserId } });

  if (!oldUser || !newUser) return false;
  if (oldUser.mainAccount.toLowerCase() === newProvider.toLowerCase()) return false;

  let data = null;
  if (newProvider === "twitter") {
    data = {
      twitterId: newUser.twitterId,
      twitterName: newUser.twitterName,
    };
  } else if (newProvider === "discord") {
    data = {
      discordId: newUser.discordId,
      discordName: newUser.discordName,
    };
  }

  const newUserData = { ...data };

  try {
    await prisma.$transaction(async (prisma) => {
      const existingNewUser = await prisma.user.findUnique({
        where: { id: newUserId },
      });
      if (!existingNewUser) return false;

      await prisma.user.delete({ where: { id: newUserId } });

      const existingOldUser = await prisma.user.findUnique({
        where: { id: oldUserId },
      });
      if (!existingOldUser) return false;

      await prisma.user.update({
        where: { id: oldUserId },
        data: {
          ...newUserData,
          id: newUserId,
        },
      });
    });
    return true
  } catch (error) {
    console.error(`Error in merging users: ${error.message}`);
    return false;
  }
} catch (error) {
  console.error(`Error in merging users: ${error}`);
  return false;
}
};

module.exports = mergeUsers;
