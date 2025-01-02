import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";


export const addNewPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const image = req.file;
        const authorId = req.id;

        if (!image) {
            return res.status(400).json({ message: 'Image required' });

        }
        const oprimizedImageBuffer = await sharp(image.buffer).resize({ width: 800, height: 800 }).toFormat('jpeg', { quality: 80 }).toBuffer();
        const fileUri = `data:image/jpeg;base64,${oprimizedImageBuffer.toString('base64')}`;
        console.log(fileUri);

        const cloudRes = await cloudinary.uploader.upload(fileUri);
        const newPost = await Post.create({
            caption,
            image: cloudRes.secure_url,
            author: authorId,
        });
        const user = await User.findById(authorId);
        if (user) {
            user.post.push(newPost._id);
            await user.save();
        }
        await newPost.populate({ path: 'author', select: '-password' });

        return res.status(201).json({ message: 'New post created', success: true, data: newPost });

    } catch (error) {
        console.log(error);

    }
}

export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'username profilePicture' })
            .populate({ path: 'comments', sort: { createdAt: 1 }, populate: { path: 'author', select: 'username profilePicture' } });
        return res.status(201).json({ success: true, data: posts });
    } catch (error) {
        console.log(error);

    }
}

export const getPostById = async (req, res) => {
    try {
        const authorId = req.params.id;
        const posts = await Post.find({ author: authorId })
            .sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'username profilePicture' })
            .populate({ path: 'comments', sort: { createdAt: 1 }, populate: { path: 'author', select: 'username profilePicture' } });
        return res.status(201).json({ success: true, data: posts });
    } catch (error) {
        console.log(error);
    }
}


export const likePost = async (req, res) => {
    try {
        const postLikedAccountId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found', success: false });
        }
        await post.updateOne({ $addToSet: { likes: postLikedAccountId } });
        await post.save();
        return res.status(201).json({ success: true, message: 'Liked' });
    } catch (error) {
        console.log(error);
    }
}

export const dislikePost = async (req, res) => {
    try {
        const postLikedAccountId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found', success: false });
        }
        await post.updateOne({ $pull: { likes: postLikedAccountId } });
        await post.save();
        return res.status(201).json({ success: true, message: 'disLiked' });
    } catch (error) {
        console.log(error);
    }
}

export const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const commetedAccountId = req.id;

        const { comment } = req.body;
        const post = await Post.findById(postId);
        if (!comment) {
            return res.status(400).json({ message: 'Comment required' });
        }
        const newComment = await Comment.create({
            text: comment,
            author: commetedAccountId,
            post: postId,
        });

        await newComment.populate({ path: 'author', select: 'username profilePicture' });
        post.comments.push(newComment._id);
        await post.save();

        return res.status(201).json({ success: true, data: newComment });

    } catch (error) {
        console.log(error);
    }
}

export const getCommentByPostId = async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.find({ post: postId }).populate({ path: 'author', select: 'username profilePicture' });
        if (!comments) {
            return res.status(400).json({ message: 'Comment not found', success: false });
        }
        return res.status(200).json({ success: true, data: comments });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found', success: false });

        }
        if (post.author.toString() !== authorId) {
            return res.status(401).json({ message: 'Unauthorized', success: false });
        }
        await Post.findByIdAndDelete(postId);
        let user = await User.findById(authorId);
        user.post = user.post.filter(id => id.toString() !== postId);
        await user.save();

        await Comment.deleteMany({ post: postId });

        return res.status(201).json({ message: 'Post deleted', success: true });
    } catch (error) {
        console.log(error);
    }
}

export const bookMarkPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const accountId = req.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found', success: false });
        }
        const user = await User.findById(accountId);
        if (!user) {
            return res.status(404).json({ message: 'Post not found', success: false });
        }
        if (user.bookMarks.includes(post._id)) {
            await user.updateOne({ $pull: { bookMarks: post._id } });
            await user.save();
            return res.status(201).json({ type: 'unsaved', message: 'Post removed from bookmark', success: true });

        } else {
            await user.updateOne({ $addToSet: { bookMarks: post._id } });
            await user.save();
            return res.status(201).json({ type: 'saved', message: 'Post added to bookmark', success: true });
        }

    } catch (error) {
        console.log(error);

    }
}