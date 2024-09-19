const { PrismaClient } = require("@prisma/client");
const confirmTask = require("../confirmTask/general");
const prisma = new PrismaClient();

const validateAutoTasks = async () => {
  console.log("confirming pending tasks...");
  const pendingTasks = await prisma.taskStatus.findMany({
    where: {
      status: "PENDING",
      screenShot: { equals: null },
      verificationLink: { equals: null },
    },
  });

  pendingTasks.forEach(async pendingTask => {
    const { taskId, userId } = pendingTask;
    await confirmTask(userId, taskId);
  });
};

module.exports = validateAutoTasks;
