import { mongoose } from "mongoose";


const connectDB = async ()=>{
    try{
     const connect =  await mongoose.connect(process.env.MONGO_URL);
      console.log("connected");
      
    }catch(err){
        console.log(err);
        
    }
}
export default connectDB;