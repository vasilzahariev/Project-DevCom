const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const ReadMessage = require('../models/ReadMessage');
const {
    getUserIdByUsername, getUserByUsername, getUserById
} = require('../controllers/authController');

const getMessages = async conversationId => {
    try {
        const ms = await Message.find({ conversationId });

        ms.sort((a, b) => {
            if (a.date < b.date) return -1;
            else if (a.date > b.date) return 1;

            return 0;
        });

        const messages = await Promise.all(ms.map(async m => {
            const user = await getUserById(m.userId);

            return {
                _id: m._id,
                conversationId: m.conversationId,
                content: m.content,
                date: m.date,
                userId: m.userId,
                user
            }
        }));

        return {
            status: true,
            messages
        }
    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }
}

const getChat = async id => {
    try {
        const chat = await Conversation.findById(id);
        const users = await Promise.all(chat.users.map(async id => {
            return await getUserById(id);
        }));

        return {
            chat,
            users,
            status: true
        }
    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }
}

const getChats = async userId => {
    try {
        const convos = await Conversation.find({ users: userId });
        const chats = await Promise.all(convos.map(async convo => {
            const users = await Promise.all(convo.users.map(async id => {
                return await getUserById(id);
            }));

            // TODO: Get last message

            return {
                _id: convo._id,
                name: convo.name,
                users
            }
        }));

        return {
            chats,
            status: true
        }
    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }
}

const create = async body => {
    const {
        creatorId,
        name,
        usernames
    } = body;

    try {
        const users = await Promise.all(usernames.map(async username => {
            return await getUserIdByUsername(username);
        }));

        const chat = new Conversation({
            creatorId,
            name,
            users
        });

        await chat.save();

        return {
            status: true,
            chatId: chat._id
        }
    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }
}

const send = async body => {
    const {
        conversationId,
        content,
        userId
    } = body;

    try {
        const message = new Message({
            conversationId,
            content,
            userId,
            date: Date.now()
        });

        await message.save();

        return {
            status: true
        }
    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }
}

module.exports = {
    getChats,
    create,
    getChat,
    send,
    getMessages
}
