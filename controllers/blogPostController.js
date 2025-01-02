// src/controllers/blogPostController.js
import BlogPost from '../models/BlogPost.js';

export const createBlogPost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const author = req.user._id;  // Author will be the logged-in user

        // If images were uploaded, store their paths
        const imagePaths = req.files ? req.files.map(file => file.path) : [];

        // Create the new blog post
        const newBlogPost = new BlogPost({
            title,
            content,
            author,
            tags: tags ? tags.split(',') : [],
            images: imagePaths
        }); 

        // Save the blog post to the database
        await newBlogPost.save();

        res.status(201).json({ message: 'Blog post created successfully', newBlogPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating blog post' });
    }
};

export const getBlogPosts = async (req, res) => {
    try {
        const blogPosts = await BlogPost.find().populate('author', 'name email');
        res.status(200).json(blogPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching blog posts' });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { blogId } = req.params; // Extract blogId from URL params
        const { title, content, tags } = req.body; // Extract fields to update
        const userId = req.user._id; // Get the authenticated user's ID

        // Find the blog post by ID
        const blogPost = await BlogPost.findById(blogId);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // Check if the user is the author or an admin
        if (blogPost.author.toString() !== userId.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to update this post' });
        }

        // Update the blog post
        if (title) blogPost.title = title;
        if (content) blogPost.content = content;
        if (tags) blogPost.tags = tags.split(','); // Convert tags to an array

        // If images were uploaded, update the images array
        if (req.files) {
            const imagePaths = req.files.map(file => file.path);
            blogPost.images = [...blogPost.images, ...imagePaths]; // Append new images to existing ones
        }

        // Save the updated blog post
        const updatedBlogPost = await blogPost.save();

        res.status(200).json({ message: 'Blog post updated successfully', updatedBlogPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating blog post' });
    }
};
export const getBlogPostById = async (req, res) => {
    try {
        const { blogId } = req.params; // Extract blogId from URL params

        // Find the blog post by ID and populate the author field
        const blogPost = await BlogPost.findById(blogId).populate('author', 'name email');

        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.status(200).json(blogPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching blog post', error });
    }
};
export const deleteBlogPost = async (req, res) => {
    try {
        const { blogId } = req.params; // Extract blogId from URL params
        const userId = req.user._id;  // Get the authenticated user's ID

        // Find the blog post by ID
        const blogPost = await BlogPost.findById(blogId);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // Check if the user is the author or an admin
        if (blogPost.author.toString() !== userId.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }

        // Delete the blog post
        await BlogPost.findByIdAndDelete(blogId);

        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting blog post', error });
    }
};
