const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cancelTask = async (userId, taskId) => {
  await prisma.taskStatus.deleteMany({ where: { userId, taskId } });
};

const successTask = async (userId, taskId, taskXP) => {
  await prisma.$transaction(async (prisma) => {
    const t1 = await prisma.taskStatus.update({
      where: { userId, taskId },
      data: { status: "COMPLETED" },
    });
    const t2 = await prisma.user.update({
      where: { id: userId },
      data: { xp: { increment: taskXP } },
    });

    return [t1, t2];
  });
};

const confirmTask = async (userId, taskId) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const task = await prisma.task.findUnique({ where: { id: taskId } });

  if (
    !["DISCORD", "TELEGRAM"].includes(task.platform) &&
    task.taskVerificationType === "AUTO_API"
  ) {
    await cancelTask(userid, taskId);
    return;
  }

  const socialId =
    task.platform === "DISCORD"
      ? user.discordId
      : task.platform === "TELEGRAM"
      ? user.telegramId
      : "";

  const verify = require(`./telegram/${task.taskType.toLowerCase()}/index.js`);
  const result = await verify(task.channelId, socialId);
  if (result) {
    await successTask(userid, taskId, task.xp);
  } else {
    await cancelTask(userid, taskId);
  }
};

module.exports = confirmTask;
