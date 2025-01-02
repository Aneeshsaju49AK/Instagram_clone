import express from 'express';
import { editUserProfile, followOrUnfollowUser, getSuggestedUser, getUserProfile, login, logout, register } from '../controller/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload from '../middlewares/multer.js';

const router = express.Router();


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/:id/profile').get(isAuthenticated, getUserProfile);
router.route('/profile/edit').post(isAuthenticated, upload.single('profilePicture'), editUserProfile);
router.route('/suggested').get(isAuthenticated, getSuggestedUser);
router.route('/followorunfollow/:id').post(isAuthenticated, followOrUnfollowUser);


export default router;