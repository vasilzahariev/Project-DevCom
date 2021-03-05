const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const ReadMessage = require('../models/ReadMessage');
const {
    getUserIdByUsername, getUserByUsername, getUserById
} = require('../controllers/authController');

const getMessages = async (conversationId, userId) => {
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

        await ReadMessage.deleteMany({ userId, conversationId });

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

const sortChats = (a, b) => {
    const date1 = a.lastMessage ? a.lastMessage.date : null;
    const date2 = b.lastMessage ? b.lastMessage.date : null;

    if (date1 < date2) return 1;
    else if (date1 > date2) return -1;

    return 0;
}

const getChats = async userId => {
    try {
        const convos = await Conversation.find({ users: userId });
        const chats = await Promise.all(convos.map(async convo => {
            const users = await Promise.all(convo.users.map(async id => {
                return await getUserById(id);
            }));

            const lastMessage = await Message.findOne({ conversationId: convo._id }, {}, { sort: { 'date': -1 } });

            return {
                _id: convo._id,
                name: convo.name,
                users,
                lastMessage,
                unread: await ReadMessage.count({ userId, conversationId: convo._id })
            }
        }));

        return {
            chats: chats.sort(sortChats),
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
        if (!creatorId || !usernames) return { status: false };

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
        if (!conversationId || !content || !userId) return { status: false };

        const message = new Message({
            conversationId,
            content,
            userId,
            date: Date.now()
        });

        await message.save();

        const convo = await Conversation.findById(conversationId);

        for (const user of convo.users) {
            if (user.equals(userId)) continue;

            const readMessage = new ReadMessage({ userId: user, conversationId, messageId: message._id, read: false });

            await readMessage.save();
        }

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

const getUnreadCount = async userId => {
    try {
        const unreadMessages = await ReadMessage.count({ userId });

        return { unreadMessages };
    } catch (err) {
        console.log(err);

        return { unreadMessages: 0 };
    }
}

const startANewChat = async body => {
    try {
        const {
            usernames,
            message,
            sendToExisting
        } = body;

        const users = await Promise.all(usernames.map(async username => {
            return await getUserIdByUsername(username);
        }));

        const convo = await Conversation.findOne({ users: { $all: users, $size: 2 } });

        if (convo) {
            if (sendToExisting) {
                const resObj = await send({
                    conversationId: convo._id,
                    content: message,
                    userId: users[0]
                });

                return {
                    status: resObj.status,
                    id: convo._id
                }
            }

            return {
                status: true,
                id: convo._id
            }
        }

        const chat = new Conversation({
            creatorId: users[0],
            name: '',
            users
        });

        await chat.save();

        const resObj = await send({
            conversationId: chat._id,
            content: message,
            userId: users[0]
        });

        return {
            status: resObj.status,
            id: chat._id
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
    getMessages,
    getUnreadCount,
    startANewChat
}
