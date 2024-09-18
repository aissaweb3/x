const { PrismaClient } = require("@prisma/client");
const { verify } = require("jsonwebtoken");
const prisma = new PrismaClient();

const createReferral = async (token, referralToken, SECRET) => {
  console.log("referring...");
  
    
  const { referral:referralId } = verify(referralToken, SECRET);
  const { id } = verify(token, SECRET);

  console.log({referralToken, token});
  console.log({referralId, id});
  

  if (!id || !referralId) return console.log("not valid");

  const newUser = await prisma.user.findUnique({ where: { id } });
  const referralUser = await prisma.user.findUnique({ where: { referralId } });

  if (!referralUser || !newUser) return;
  if (isOlderThan10Minutes(newUser.createdAt)) return

  await prisma.$transaction(async (prisma) => {
    const t1 = await prisma.user.update({
      where: { referralId },
      data: { referrals: { increment: 1 } },
    });
    const t2 = await prisma.user.update({
      where: { id },
      data: { referredBy: referralId },
    });

    return [t1, t2];
  });
};

function isOlderThan10Minutes(date) {
  const now = new Date();
  const providedDate = new Date(date);
  const diffInMillis = now - providedDate;
  const tenMinutesInMillis = 24 * 60 * 60 * 1000;
  return diffInMillis > tenMinutesInMillis;
}

module.exports = createReferral;
