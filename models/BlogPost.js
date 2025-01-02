import mongoose from 'mongoose';

// Schema for Blog Post
const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to User model
    tags: [{ type: String }],  // Array of tags
    images: [{ type: String }],  // Array of image URLs
}, { timestamps: true });

export default mongoose.model('BlogPost', blogPostSchema);
