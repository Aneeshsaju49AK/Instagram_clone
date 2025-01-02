import pkg from 'cloudinary'; // Import the entire module
import dotenv from 'dotenv';
dotenv.config();

const cloudinary = pkg.v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_KEY_SECRET
});
 
export default cloudinary;