const { BotFrameworkAdapter } = require('botbuilder');
const restify = require('restify');

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post('/api/messages', async (req, res) => {
    await adapter.processActivity(req, res, async (context) => {
        await context.sendActivity(`Você disse: ${context.activity.text}`);
    });
});
