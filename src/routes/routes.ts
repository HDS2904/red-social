import { Router } from 'express';
import { vToken, verificaAdmRol } from '../middlewares/authentication';
import * as loginRoute from '../controllers/login.controller';
import * as userRoute from '../controllers/user.controller';
import * as postRoute from '../controllers/post.conrtoller';
import * as commentRoute from '../controllers/comment.controller';

const router = Router();

router.post('/login', loginRoute.singIn);

router.get('/usuario', [vToken, verificaAdmRol],  userRoute.getUser);
router.get('/usuario/:id', vToken, userRoute.getUserById);
router.post('/usuario', userRoute.postUser);
router.put('/usuario/:id', vToken, userRoute.putUser);
router.delete('/usuario/:id', vToken, userRoute.deleteUser);

router.get('/post', postRoute.getPost);
router.get('/post/:id', postRoute.getPostById);
router.get('/user/post/:id', postRoute.getPostByIdUser);
router.post('/post', vToken, postRoute.postPost);
router.put('/post/:id', vToken, postRoute.putPost);
router.delete('/post/:id', vToken, postRoute.deletePost);

router.get('/comment', commentRoute.getComment);
router.get('/comment/:id', commentRoute.getCommentById);
router.get('/post/comment/:id', commentRoute.getCommentByIdPost);
router.post('/comment', vToken, commentRoute.postComment);
router.put('/comment/:id', vToken, commentRoute.putComment);
router.delete('/comment/:id', vToken, commentRoute.deleteComment);

export default router;