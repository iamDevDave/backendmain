// src/routes/blogPostRoutes.js
import express from 'express';
import { createBlogPost, getBlogPosts,updateBlog,getBlogPostById,deleteBlogPost } from '../controllers/blogPostController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/authorizeMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Route to create a blog post (only admins allowed)
router.post('/create', authenticate, authorize, upload.array('images', 5), createBlogPost);
// Route to update a blog post by ID
router.put('/update/:blogId', authenticate,authorize, upload.array('images', 5), updateBlog);
// Route to get a single blog post by ID
router.get('/:blogId', getBlogPostById);
// Route to delete a blog post by ID
router.delete('/delete/:blogId', authenticate,authorize, deleteBlogPost);
// Route to get all blog posts
router.get('/', getBlogPosts);

export default router;
