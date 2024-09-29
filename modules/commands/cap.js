module.exports = {
    config: {
        name: 'cap',
        version: '1.0.1',
        hasPermssion: 0,
        credits: 'NDK',
        description: 'chụp wall hoặc web nào đó',
        usages: [
            'cap : Chụp wall của bạn',
            'cap <reply>: Chụp wall người bạn reply',
            'cap <tag>: Chụp wall người bạn tag',
            'cap <link>: Chụp wall web',
        ],
        cooldowns: 5,
        commandCategory: 'Niiozic',
        usePrefix: false,
        dependencies: {
            puppeteer: '',
            'fs-extra': '',
        },
    },
    run: async function ({ api, event, args, Users }) {
        const { createReadStream, unlinkSync } = global.nodemodule['fs-extra'];
        const puppeteer = global.nodemodule['puppeteer'];
        const { resolve } = global.nodemodule['path'];
        var path = resolve(__dirname, 'cache', `cap${event.threadID}_${event.senderID}.png`);
        try {
            if (!args[0] || event.type == 'message_reply' || Object.keys(event.mentions).length !== 0) {
                if (!args[0]) uid = event.senderID;
                if (event.type == 'message_reply') uid = event.messageReply.senderID;
                if (Object.keys(event.mentions).length !== 0) uid = Object.keys(event.mentions)[0];
                var browser = await puppeteer.launch((args = ['--no-sandbox']));
                var page = await browser.newPage();
                page.setViewport({ width: 1920, height: 1080 });
                api.sendMessage(
                    `🔄 Vui lòng chờ ${(await Users.getData(event.senderID)).name}`,
                    event.threadID,
                    event.messageID,
                );
                var getAppState = api.getAppState();
                var cookies = [sb=yOt2ZhceJGavMvxyiQJr_qLw;datr=yOt2ZnxxXB3Yuu0nrOsnvpkc;ps_n=1;ps_l=1;vpd=v1%3B716x360x2;c_user=100082352787478;xs=3%3A9pHuD7yl7dbarA%3A2%3A1724135820%3A-1%3A8606;m_page_voice=100082352787478;fr=13CkfjWCq4jmE2XPS.AWUQzNQBPAoend1ULUPqYZ6aOEo.BmxDdD..AAA.0.0.Bmy7k4.AWXd0ldu9JI;locale=en_GB;wd=360x716;fbl_st=100621439%3BT%3A28793222;wl_cbv=v2%3Bclient_version%3A2634%3Btimestamp%3A1727593333;];
                getAppState.forEach(function (a) {
                    cookies.push({
                        name: a.key,
                        value: a.value,
                        domain: `.${a.domain}`,
                        path: a.path,
                        httpOnly: a.hostOnly,
                        sameSite: 'None',
                        secure: true,
                        sameParty: false,
                        sourceScheme: 'Secure',
                        sourcePort: 443,
                    });
                });
                await page.setCookie(...cookies);
                await page.goto(`https://www.facebook.com/profile.php?id=${uid}`, { waitUntil: ['networkidle2'] });
                await page.waitForSelector('body');
                await page.screenshot({ path: path });
                await browser.close();
                return api.sendMessage(
                    {
                        body: `✅ Đã xong ${(await Users.getData(event.senderID)).name}`,
                        mentions: [
                            {
                                tag: (await Users.getData(event.senderID)).name,
                                id: event.senderID,
                            },
                        ],
                        attachment: createReadStream(path),
                    },
                    event.threadID,
                    () => unlinkSync(path),
                    event.messageID,
                );
            }
            if (args[0].indexOf('https://') != -1) {
                if (args[0].includes('facebook.com')) {
                    var browser = await puppeteer.launch((args = ['--no-sandbox']));
                    var page = await browser.newPage();
                    page.setViewport({ width: 1920, height: 1080 });
                    api.sendMessage(
                        `🔄 Vui lòng chờ ${(await Users.getData(event.senderID)).name}`,
                        event.threadID,
                        event.messageID,
                    );
                    var getAppState = api.getAppState();
                    var cookies = [];
                    getAppState.forEach(function (a) {
                        cookies.push({
                            name: a.key,
                            value: a.value,
                            domain: `.${a.domain}`,
                            path: a.path,
                            httpOnly: a.hostOnly,
                            sameSite: 'None',
                            secure: true,
                            sameParty: false,
                            sourceScheme: 'Secure',
                            sourcePort: 443,
                        });
                    });
                    await page.setCookie(...cookies);
                    await page.goto(event.args[1], { waitUntil: ['networkidle2'] });
                    await page.waitForSelector('body');
                    await page.screenshot({ path: path });
                    await browser.close();
                    return api.sendMessage(
                        {
                            body: `✅ Đã xong ${(await Users.getData(event.senderID)).name}`,
                            mentions: [
                                {
                                    tag: (await Users.getData(event.senderID)).name,
                                    id: event.senderID,
                                },
                            ],
                            attachment: createReadStream(path),
                        },
                        event.threadID,
                        () => unlinkSync(path),
                        event.messageID,
                    );
                } else {
                    var browser = await puppeteer.launch((args = ['--no-sandbox']));
                    var page = await browser.newPage();
                    page.setViewport({ width: 1920, height: 1080 });
                    api.sendMessage(
                        `🔄 Vui lòng chờ ${(await Users.getData(event.senderID)).name}`,
                        event.threadID,
                        event.messageID,
                    );
                    await page.goto(event.args[1], { waitUntil: ['networkidle2'] });
                    await page.waitForSelector('body');
                    await page.screenshot({ path: path });
                    await browser.close();
                    return api.sendMessage(
                        {
                            body: `✅ Đã xong ${(await Users.getData(event.senderID)).name}`,
                            mentions: [
                                {
                                    tag: (await Users.getData(event.senderID)).name,
                                    id: event.senderID,
                                },
                            ],
                            attachment: createReadStream(path),
                        },
                        event.threadID,
                        () => unlinkSync(path),
                        event.messageID,
                    );
                }
            }
        } catch (e) {
            console.log(e);
        }
    },
};
