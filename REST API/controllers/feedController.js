const User = require('../models/User');
const FeedPost = require('../models/FeedPost');
const FeedPostReply = require('../models/FeedPostReply');

const {
    getUserIdByUsername, getUserById
} = require('./authController');

const addPost = async body => {
    const {
        username,
        content,
        imageUrl
    } = body;

    try {
        const userId = await getUserIdByUsername(username);

        const post = new FeedPost({
            authorId: userId,
            content,
            imageUrl,
            date: Date.now()
        });

        await post.save();

        return {
            status: true
        }
    } catch (err) {
        return {
            status: false
        }
    }
}

const getUserFeed = async username => {
    const userId = await getUserIdByUsername(username);

    const feed = await FeedPost.find({ authorId: userId });
    const user = await getUserById(userId);

    const result = await Promise.all(feed.map(async post => {
        const commentsCount = await FeedPostReply.count({ postId: post._id });

        return {
            post,
            user,
            commentsCount
        }
    }));

    return result;
}

const like = async body => {
    const {
        userId,
        postId
    } = body;

    if (!userId || !postId) return;

    const post = await FeedPost.findById(postId);

    if (post.likes.includes(userId)) {
        await FeedPost.findByIdAndUpdate(postId, { $pull: { likes: userId } })
    } else {
        await FeedPost.findByIdAndUpdate(postId, { $addToSet: { likes: userId } });
    }
}

const comment = async body => {
    const {
        userId,
        postId,
        content,
        imageUrl
    } = body;

    const postReply = new FeedPostReply({
        authorId: userId,
        postId,
        content,
        imageUrl,
        date: Date.now()
    });

    await postReply.save();

    return true;
}

const getComments = async postId => {
    const comments = await FeedPostReply.find({ postId });

    return await Promise.all(comments.map(async c => {
        return {
            comment: c,
            user: await getUserById(c.authorId)
        }
    }));
}

module.exports = {
    addPost,
    getUserFeed,
    like,
    comment,
    getComments
}