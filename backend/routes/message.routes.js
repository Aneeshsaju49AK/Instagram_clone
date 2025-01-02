import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getConversation, sendMessage } from '../controller/message.controller.js';

const router = express.Router();

router.route('/send/:id').post(isAuthenticated, sendMessage);
router.route('/all/id').get(isAuthenticated, getConversation );


export default router;
