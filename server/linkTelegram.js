const { PrismaClient } = require("@prisma/client");
const { verify } = require("jsonwebtoken");
const ENV = require("../getENV");
const prisma = new PrismaClient();

const linkTelegram = async (telegramId, telegramName, token) => {
    const { id } = verify(token, ENV.JWT_SECRET);
    if (!id) return;
    await prisma.user.update({ where: {id}, data: { telegramId, telegramName } })
};

module.exports = linkTelegram;
