/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
const {
    getChats,
    create,
    getChat,
    send,
    getMessages,
} = require('../controllers/chatController');
const { register } = require('../controllers/authController');
const Message = require('../models/Message');
const ReadMessage = require('../models/ReadMessage');

describe('chat', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/chat', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    beforeEach(async () => {
        await mongoose.connection.db.dropDatabase();
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it(`should return chat id after 'create' func`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });
        const { user: user2 } = await register({
            username: 'username2',
            fullName: 'fullName2',
            email: 'email2@email.com',
            password: 'password2'
        });

        const { chatId, status } = await create({
            creatorId: user._id,
            name: 'Group',
            usernames: [user.username, user2.username]
        })

        expect(chatId).toBeTruthy();
        expect(status).toBeTruthy();
    });

    it(`should get chat with id`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });
        const { user: user2 } = await register({
            username: 'username2',
            fullName: 'fullName2',
            email: 'email2@email.com',
            password: 'password2'
        });

        const { chatId } = await create({
            creatorId: user._id,
            name: 'Group',
            usernames: [user.username, user2.username]
        });

        const chat = await getChat(chatId);

        expect(chat).toBeTruthy();
        expect(chat.chat._id).toEqual(chatId);
        expect(chat.users.length).toBe(2);
    });

    it(`should send a message`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });
        const { user: user2 } = await register({
            username: 'username2',
            fullName: 'fullName2',
            email: 'email2@email.com',
            password: 'password2'
        });

        const { chatId } = await create({
            creatorId: user._id,
            name: 'Group',
            usernames: [user.username, user2.username]
        });

        const { status } = await send({
            conversationId: chatId,
            content: 'Hello there!',
            userId: user._id
        });

        const messagesCount = await Message.count();
        const unreadMessagesCount = await ReadMessage.count();

        expect(status).toBeTruthy();
        expect(messagesCount).toBe(1);
        expect(unreadMessagesCount).toBe(1);
    });

    it(`should not send a message`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });
        const { user: user2 } = await register({
            username: 'username2',
            fullName: 'fullName2',
            email: 'email2@email.com',
            password: 'password2'
        });

        const { status } = await send({
            conversationId: undefined,
            content: 'Hello there!',
            userId: user._id
        });

        const messagesCount = await Message.count();
        const unreadMessagesCount = await ReadMessage.count();

        expect(status).toBeFalsy();
        expect(messagesCount).toBe(0);
        expect(unreadMessagesCount).toBe(0);
    });

    it(`should not send a message 2`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });
        const { user: user2 } = await register({
            username: 'username2',
            fullName: 'fullName2',
            email: 'email2@email.com',
            password: 'password2'
        });

        const { chatId } = await create({
            creatorId: user._id,
            name: 'Group',
            usernames: [user.username, user2.username]
        });

        const { status } = await send({
            conversationId: chatId,
            content: 'Hello there!',
            userId: undefined
        });

        const messagesCount = await Message.count();
        const unreadMessagesCount = await ReadMessage.count();

        expect(status).toBeFalsy();
        expect(messagesCount).toBe(0);
        expect(unreadMessagesCount).toBe(0);
    });

    it(`should not send a message 3`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });
        const { user: user2 } = await register({
            username: 'username2',
            fullName: 'fullName2',
            email: 'email2@email.com',
            password: 'password2'
        });

        const { chatId } = await create({
            creatorId: user._id,
            name: 'Group',
            usernames: [user.username, user2.username]
        });

        const { status } = await send({
            conversationId: chatId,
            content: '',
            userId: user._id
        });

        const messagesCount = await Message.count();
        const unreadMessagesCount = await ReadMessage.count();

        expect(status).toBeFalsy();
        expect(messagesCount).toBe(0);
        expect(unreadMessagesCount).toBe(0);
    });

    it(`should get all messages`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });
        const { user: user2 } = await register({
            username: 'username2',
            fullName: 'fullName2',
            email: 'email2@email.com',
            password: 'password2'
        });

        const { chatId } = await create({
            creatorId: user._id,
            name: 'Group',
            usernames: [user.username, user2.username]
        });

        await send({
            conversationId: chatId,
            content: 'Hello there!',
            userId: user2._id
        });
        await send({
            conversationId: chatId,
            content: 'General Kenobi!',
            userId: user2._id
        });

        const { messages, status } = await getMessages(chatId, user._id);
        const unreadMessagesCount = await ReadMessage.count();

        expect(status).toBeTruthy();
        expect(messages.length).toBe(2);
        expect(messages[0].content).toBe('Hello there!');
        expect(unreadMessagesCount).toBe(0);
    });

    it(`should get all user chats`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });
        const { user: user2 } = await register({
            username: 'username2',
            fullName: 'fullName2',
            email: 'email2@email.com',
            password: 'password2'
        });

        await create({
            creatorId: user._id,
            name: 'Group',
            usernames: [user.username, user2.username]
        });

        await create({
            creatorId: user._id,
            name: 'Group 2',
            usernames: [user.username, user2.username]
        });

        await create({
            creatorId: user2._id,
            name: 'Group 3',
            usernames: [user2.username]
        });

        const { chats: userChats, status } = await getChats(user._id);

        expect(status).toBeTruthy();
        expect(userChats.length).toBe(2);
    });

});

/*

it(``, async () => {

});

*/