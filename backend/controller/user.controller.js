import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";


export const register = async (req , res) => {
    
     console.log(req.body);
    try {
        const {username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(401).json({ message: "Something is missing,please check again", success: false });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({ message: "User already exists Try different email", success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await  User.create({ username, email, password: hashedPassword });
        return res.status(201).json({ message: "Account Created", success: true, data: newUser });
    } catch (err) {
        console.log(err);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ message: "Something is missing,please check again", success: false });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Incorrect email or password", success: false });
        }
        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return res.status(401).json({ message: "Incorrect email or password", success: false });

        }
        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
        console.log(token);

        const populatedPosts = await Promise.all(
            user.post.map(async (postId)=>{
                const post = await Post.findById(postId);
                if(post.author.equals(user._id)){
                    return post;
                }
                return null;
            })
        )
        
        return res.cookie('token', token, { httpOnly: true, sameSite: 'Strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({ message: 'Welcome back', success: true, data: user , posts:populatedPosts });
    } catch (err) {

        console.log(err);
    }
};

export const logout = async (req, res) => {
    try {
        return res.cookie('token', "", { maxAge: 0 }).json({ message: 'Logged out', success: true });
    } catch (err) {
        console.log(err);

    }
};

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        let user = await User.findById(userId).select('-password');
        return res.status(200).json({ message: 'User found', success: true, data: user });

    } catch (err) {
        console.log(err);

    }
};

export const editUserProfile = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        const { bio, gender } = req.body;
        const profilePicture = req.file;
        let cloudRes;
        if (profilePicture) {
            const fileUri = getDataUri(profilePicture);
            cloudRes = await cloudinary.uploader.upload(fileUri);

        }
        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (profilePicture) user.profilePicture = cloudRes.secure_url;

        await user.save();
        return res.status(201).json({ message: 'Profile Updated', success: true, data: user });
    } catch (err) {
        console.log(err);

    }
};
export const getSuggestedUser = async (req, res) => {
    try {
        const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select('-password');
        if (!suggestedUsers) {
            return res.status(400).json({ message: 'User not found', success: false });
        }
        return res.status(201).json({ success: true, data: suggestedUsers });

    } catch (error) {
        console.log(error);

    }
};

export const followOrUnfollowUser = async (req, res) =>{
    try {
        const accoutHolderId = req.id;
        const accountToFollowOrUnfollowId = req.params.id;
        if(accoutHolderId === accountToFollowOrUnfollowId){
            return res.status(400).json({ message: 'your Unauthorized', success: false });
        }
        const accountHolder = await User.findById(accoutHolderId);
        const accountToFollowOrUnfollow = await User.findById(accountToFollowOrUnfollowId);
        if(!accountHolder || !accountToFollowOrUnfollow){
            return res.status(400).json({ message: 'your Unauthorized', success: false });
        }
        const isFollowing = accountHolder.following.includes(accountToFollowOrUnfollowId);
        console.log(isFollowing);
        
        if(isFollowing){
            await Promise.all([
                User.updateOne({_id:accoutHolderId},{$pull:{following:accountToFollowOrUnfollowId}}),
                User.updateOne({_id:accountToFollowOrUnfollowId},{$pull:{followers:accoutHolderId}}),
                
            ]);
            return res.status(201).json({ success: true, message: 'Unfollowed'});

        }else{
            await Promise.all([
                User.updateOne({_id:accoutHolderId},{$push:{following:accountToFollowOrUnfollowId}}),
                User.updateOne({_id:accountToFollowOrUnfollowId},{$push:{followers:accoutHolderId}}),
                
            ]);
            return res.status(201).json({ success: true, message: 'followed'});
        }
    } catch (error) {
        console.log(error);
        
    }
}