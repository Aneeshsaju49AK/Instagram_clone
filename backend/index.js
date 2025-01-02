import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js"
import userRouter from "./routes/user.routes.js";
import postRouter from './routes/post.routes.js';
import messageRouter from './routes/message.routes.js';


dotenv.config({});
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
const corsOption ={
    origin:'http://localhost:5173',
    Credential: true,
}
app.get('/', (req, res)=>{
    res.send('server is running')
});
app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/message', messageRouter);
app.use(cors(corsOption));
const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at port ${PORT} ${process.env.PORT}`);
});
