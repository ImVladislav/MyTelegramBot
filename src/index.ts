const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const botToken = process.env.BOT_TOKEN;
const bot = new TelegramBot(botToken, { polling: true });
const resumePath = './files/Vladislav Gladyshko_Front-end Developer.pdf';


bot.onText(/\/start/, (msg: { chat: { id: any; }; from: { first_name: any; }; text: any; }) => {
    const chatId = msg.chat.id;
    const userName = msg.from ? msg.from.first_name : 'Шановний(-а) користувачу';
    const message = msg.text; // Оголошення message в обробнику команди /start

    bot.sendMessage(chatId, `Вітаю, ${userName}! Мене звати Альберт Авксентійович, я бот-асистент Владислава! Сподіваюся зможу вам надати інформацію, яка вас цікавить.`, {
        reply_markup: {
            keyboard: [
                ["Надай мені Резюме Владислава"],
                ["Надай посилання на Гітхаб"],
                ["Надай посилання на його роботи"],
                ["Розкажи мені про Владислава"]
            ],
            resize_keyboard: true
        }
    });
});

bot.onText(/Надай посилання на Гітхаб/, (msg: { chat: { id: any; }; }) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `https://github.com/ImVladislav`);
}); 

bot.onText(/Надай посилання на його роботи/, (msg: { chat: { id: any; }; }) => {
    const chatId = msg.chat.id;
    const keyboardWithProjects = {
        keyboard: [
            ["Інтернет магазин Beautyblossom"],
            ["Чудова платформа для вибору Фільму Filmoteka"],
            ["Потужний сайт для тих, хто любить готувати So-Yummy"],
            ["<= Назад"]
        ],
        resize_keyboard: true
    };
    bot.sendMessage(chatId, `Звісно, на мою думку, це найкращий його проект, але ще є багато інших проектів. Який саме вас цікавить?`, { reply_markup: keyboardWithProjects });
    
    
});

bot.onText(/Надай мені Резюме Владислава/, (msg: { chat: { id: any; }; }) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Одну хвилиночку, шукаю резюме...').then
     bot.sendDocument(chatId, resumePath)
        .then(() => {
            console.log('Резюме надіслано успішно');
        })
        .catch((error: any) => {
            console.error('Помилка під час надсилання резюме:', error);
        });
});

bot.on('polling_error', (error: any) => {
    console.error(error);
});

bot.onText(/Інтернет магазин Beautyblossom/, (msg: { chat: { id: any; }; }) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Beauty blossom це потужний інтернет магазин, в якому є великий вибір товарів для краси, здоровя та дому. Владислав на цьому пректі героїчно взяв на себе роль Full-stack розробника, та майже за місяць 2 розробники написали цей чудовий сайт!`);
    
        setTimeout(() => {
    bot.sendMessage(chatId, 'Вибачте щось я розговорився... ось посилання на цей сайт.');
  }, 4000); // Таймаут на 4 секунди

    
    setTimeout(() => {
    bot.sendMessage(chatId, 'https://www.beautyblossom.com.ua/');
  }, 5000); // Таймаут на 4 секунди

}); 

bot.onText(/Потужний сайт для тих, хто любить готувати So-Yummy/, (msg: { chat: { id: any; }; }) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `So-Yummy це потужний командний проект з великим функціоналом. Це перший повноцінний проект Владислава виконаний на React та з написанням back-end частини. Ось вам ссиолчка дня ознайлмлення.`);
    
    setTimeout(() => {
    bot.sendMessage(chatId, 'https://irka-bodnariuk.github.io/team-project-so-yummy-frontend/');
  }, 2000); // Таймаут на 4 секунди

}); 


bot.onText(/Чудова платформа для вибору Фільму Filmoteka/, (msg: { chat: { id: any; }; }) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Filmoteka це цікавий командний проект, написаний на Javascript. В цьому пректі Владислав був Тім лідом, що йому дало змогу додати родзинку цьому сайту. поки я вам все не розповів, тримайте ссилку та самі все побчите =)`);
    
    setTimeout(() => {
    bot.sendMessage(chatId, 'https://imvladislav.github.io/team-project-filmoteka/');
  }, 2000); // Таймаут на 4 секунди

}); 




bot.onText(/<= Назад/, (msg: { chat: { id: any; }; }) => {
    const chatId = msg.chat.id;
    const keyboardWithProjects = {
        keyboard: [
            ["Надай мені Резюме Владислава"],
            ["Надай посилання на Гітхаб"],
            ["Надай посилання на його роботи"],
            ["Розкажи мені про Владислава"]
        ],
        resize_keyboard: true
    };

    bot.sendMessage(chatId, 'Що ще вас могло би зацікавити?', {
        reply_markup: JSON.stringify(keyboardWithProjects) // Додайте клавіатуру через reply_markup
    });
});

bot.startPolling();









// const Telegraf = require('telegraf');
// const Openai = require('openai');
// require('dotenv').config();

// const botToken = process.env.BOT_TOKEN;
// const gptToken = process.env.CHAT_GPT_TOKEN;

// const bot = new Telegraf.Telegraf(botToken);

// const configuration = {
//     apiKey: gptToken
// };

// const openai = new Openai({ apiKey: configuration.apiKey });

// // let keyboard: any[] = []; // Оголошення змінної keyboard

// bot.on('text', async (ctx) => {
//     const chatResponse = await openai.chat.completions.create({
//         messages: [{ role: "user", content: ctx.message.text }],
//         model: "gpt-3.5-turbo",
//     });
//     ctx.reply(chatResponse.data.choices[0].message.content)
// })

// bot.launch()