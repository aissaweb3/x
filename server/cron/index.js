const cron = require("node-cron")
const validateAutoTasks = require("../utils/validateAutoTasks")

cron.schedule('* * * * *', () => {
    validateAutoTasks();
});
