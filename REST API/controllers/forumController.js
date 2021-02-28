const Forum = require('../models/Forum');
const ForumModerator = require('../models/ForumModerator');
const ForumPost = require('../models/ForumPost');
const ForumComment = require('../models/ForumComment');
const ForumMember = require('../models/ForumMember');

const { getUserById, getUserIdByUsername } = require('./authController');

const checkForName = async name => {
    const count = await Forum.count({ name: name });

    return count !== 0;
}

const create = async body => {
    try {
        const {
            ownerId,
            name,
            title,
            description,
            iconUrl
        } = body;

        const exists = await checkForName(name);

        if (exists) {
            return {
                status: false,
                err: 'Name is already taken'
            }
        }

        const forum = new Forum({
            ownerId,
            name,
            title,
            description,
            iconUrl,
            createdDate: Date.now()
        });

        await forum.save();

        const mod = new ForumModerator({
            userId: ownerId,
            forumId: forum._id
        });

        await mod.save();

        return {
            status: true,
            name
        };
    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }
}

const edit = async body => {
    try {
        const {
            id,
            name,
            title,
            description,
            iconUrl
        } = body;

        const forum = await Forum.findById(id);
        const exists = await checkForName(name);

        if (exists && forum.name !== name) {
            return {
                status: false,
                err: 'Name is already taken'
            }
        }

        await Forum.findByIdAndUpdate(id, {
            name,
            title,
            description,
            iconUrl
        });

        return {
            status: true,
            name
        };
    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }
}

/// TODO: Add return for 404
const getForumByName = async name => {
    try {
        const forum = await Forum.findOne({ name });
        const mods = await ForumModerator.find({ forumId: forum._id });
        const postsObj = await ForumPost.find({ forumId: forum._id });
        const membersObj = await ForumMember.find({ forumId: forum._id });

        const moderators = await Promise.all(mods.map(async mod => {
            const user = await getUserById(mod.userId);

            return {
                moderator: mod,
                user
            }
        }));

        const posts = await Promise.all(postsObj.map(async post => {
            const user = await getUserById(post.authorId);
            const commentsCount = await ForumComment.count({ postId: post._id });

            return {
                post,
                user,
                commentsCount
            }
        }));

        const members = await Promise.all(membersObj.map(async member => {
            const user = await getUserById(member.userId);

            return {
                member,
                user
            }
        }));

        return {
            forum,
            moderators,
            posts,
            members,
            status: true
        }
    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }
}

const createPost = async body => {
    try {
        const {
            authorId,
            forumId,
            title,
            coverImageUrl,
            content
        } = body;

        const post = new ForumPost({
            authorId,
            forumId,
            title,
            coverImageUrl,
            content,
            publishedDate: Date.now()
        });

        await post.save();

        return {
            status: true,
            id: post._id
        }
    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }
}

const commentsSort = (a, b) => {
    const c1 = a.comment;
    const c2 = b.comment;
    const date1 = new Date(Date.parse(`${c1.date}`));
    const date2 = new Date(Date.parse(`${c2.date}`));

    if (c1.answer && !c2.answer) return -1;
    else if (!c1.answer && c2.answer) return 1;
    else if (date1 < date2) return 1;
    else if (date1 > date2) return -1;

    return 0;
}

const getForumPost = async (name, postId) => {
    try {
        const forum = await Forum.findOne({ name });
        const ms = await ForumModerator.find({ forumId: forum._id });
        const p = await ForumPost.findById(postId);
        const c = await ForumComment.find({ postId });
        const membersObj = await ForumMember.find({ forumId: forum._id });

        const author = await getUserById(p.authorId);
        const pOjb = {
            post: p,
            user: author
        }

        const comments = await Promise.all(c.map(async comment => {
            const user = await getUserById(comment.userId);

            return {
                comment,
                user
            }
        }));

        const moderators = await Promise.all(ms.map(async mod => {
            const user = await getUserById(mod.userId);

            return {
                moderator: mod,
                user
            }
        }));

        const members = await Promise.all(membersObj.map(async member => {
            const user = await getUserById(member.userId);

            return {
                member,
                user
            }
        }));

        return {
            status: true,
            forum,
            post: pOjb,
            comments: comments.sort(commentsSort),
            moderators,
            members
        }
    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }
}

const addComment = async (body) => {
    try {
        const {
            postId,
            comment,
            userId
        } = body;

        const forumComment = new ForumComment({
            userId,
            postId,
            content: comment,
            answer: false,
            date: Date.now()
        });

        await forumComment.save();

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

const deleteComment = async id => {
    try {
        await ForumComment.findByIdAndDelete(id);

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

const likeComment = async (body, id) => {
    try {
        const {
            hasLiked,
            userId
        } = body;

        const comment = await ForumComment.findById(id);

        if (comment.dislikes.includes(userId)) await ForumComment.findByIdAndUpdate(id, { $pull: { dislikes: userId } });

        if (hasLiked) {
            await ForumComment.findByIdAndUpdate(id, { $pull: { likes: userId } });
        } else {
            await ForumComment.findByIdAndUpdate(id, { $addToSet: { likes: userId } });
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

const dislikeComment = async (body, id) => {
    try {
        const {
            hasDisliked,
            userId
        } = body;

        const comment = await ForumComment.findById(id);

        if (comment.likes.includes(userId)) await ForumComment.findByIdAndUpdate(id, { $pull: { likes: userId } });

        if (hasDisliked) {
            await ForumComment.findByIdAndUpdate(id, { $pull: { dislikes: userId } });
        } else {
            await ForumComment.findByIdAndUpdate(id, { $addToSet: { dislikes: userId } });
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

const likePost = async (body, id) => {
    try {
        const {
            hasLiked,
            userId
        } = body;

        const post = await ForumPost.findById(id);

        if (post.dislikes.includes(userId)) await ForumPost.findByIdAndUpdate(id, { $pull: { dislikes: userId } });

        if (hasLiked) {
            await ForumPost.findByIdAndUpdate(id, { $pull: { likes: userId } });
        } else {
            await ForumPost.findByIdAndUpdate(id, { $addToSet: { likes: userId } });
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

const dislikePost = async (body, id) => {
    try {
        const {
            hasDisliked,
            userId
        } = body;

        const post = await ForumPost.findById(id);

        if (post.likes.includes(userId)) await ForumPost.findByIdAndUpdate(id, { $pull: { likes: userId } });

        if (hasDisliked) {
            await ForumPost.findByIdAndUpdate(id, { $pull: { dislikes: userId } });
        } else {
            await ForumPost.findByIdAndUpdate(id, { $addToSet: { dislikes: userId } });
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

const deletePost = async id => {
    try {
        await ForumComment.deleteMany({ postId: id });

        await ForumPost.findByIdAndDelete(id);

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

const editPost = async body => {
    try {
        const {
            id,
            title,
            coverImageUrl,
            content
        } = body;

        await ForumPost.findByIdAndUpdate(id, {
            title,
            coverImageUrl,
            content
        });

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

const setAnswer = async body => {
    try {
        const {
            id,
            answer
        } = body;

        await ForumComment.findByIdAndUpdate(id, { answer });

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

const editComment = async body => {
    try {
        const {
            id,
            content
        } = body;

        await ForumComment.findByIdAndUpdate(id, { content });

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

const join = async body => {
    try {
        const {
            forumId,
            userId
        } = body;

        const exists = await ForumMember.exists({ forumId, userId });

        if (exists) return;

        const member = new ForumMember({
            forumId,
            userId
        });

        await member.save();

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

const leave = async body => {
    try {
        const {
            forumId,
            userId
        } = body;

        await ForumMember.findOneAndDelete({ forumId, userId });

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

const checkForIdInIds = (userIds, id) => {
    for (const userId of userIds) {
        if (userId.equals(id)) return true;
    }

    return false;
}

const addMods = async body => {
    try {
        const {
            users,
            forumId
        } = body;

        let userIds = [];

        for (const username of users) {
            const userId = await getUserIdByUsername(username);

            const exists = await ForumModerator.exists({ userId, forumId });

            if (!exists) {
                const mod = new ForumModerator({
                    userId,
                    forumId
                });

                await mod.save();
            }

            userIds.push(userId);
        }

        const prevMods = await ForumModerator.find();

        for (const mod of prevMods) {
            if (!checkForIdInIds(userIds, mod.userId)) {
                await ForumModerator.findByIdAndDelete(mod._id);
            }
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

const sortPosts = (a, b) => {
    const post1 = a.post;
    const post2 = b.post;
    const date1 = new Date(Date.parse(`${post1.publishedDate}`));
    const date2 = new Date(Date.parse(`${post2.publishedDate}`));

    if (date1 < date2) return 1;
    else if (date1 > date2) return -1;

    return 0;

}

const getUserForumFeed = async userId => {
    try {
        const userForums = await ForumMember.find({ userId });
        const forums = await Promise.all(userForums.map(async uf => uf.forumId));
        const posts = [];

        for (const forumId of forums) {
            const forum = await Forum.findById(forumId);
            const forumPostsObj = await ForumPost.find({ forumId });
            const forumPosts = await Promise.all(forumPostsObj.map(async post => {
                const user = await getUserById(post.authorId);

                return {
                    forum,
                    post,
                    user
                }
            }));

            posts.push(...forumPosts);
        }

        return {
            posts: posts.sort(sortPosts),
            status: true
        }
    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }
}

const getAllForums = async () => {
    return await Forum.find();
}

module.exports = {
    create,
    edit,
    getForumByName,
    createPost,
    getForumPost,
    addComment,
    deleteComment,
    likeComment,
    dislikeComment,
    likePost,
    dislikePost,
    deletePost,
    editPost,
    setAnswer,
    editComment,
    join,
    leave,
    addMods,
    getUserForumFeed,
    getAllForums
}
