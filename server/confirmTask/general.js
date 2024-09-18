const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

const cancelTask = async (userId, taskId) => {
    await prisma.taskStatus.deleteMany({where: {userId, taskId}})
}

const confirmTask = async (userId, taskId) => {
    const user = await prisma.user.findUnique({where: {id: userId}});
    const task = await prisma.task.findUnique({where: {id: taskId}});

    if ( !["DISCORD", "TELEGRAM"].includes(task.platform) ) {
        await cancelTask(userid, taskId);
        return;
    }

    const socialId = task.platform === "DISCORD" ? user.discordId : task.platform === "TELEGRAM" ? user.telegramId : ""
    
    const verify = require(`./telegram/${task.taskType.toLowerCase()}`)
    const result = await verify(socialId);
        
}


module.exports = confirmTask