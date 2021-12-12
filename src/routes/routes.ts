import { Router } from 'express';
import { vToken, verificaAdmRol } from '../middlewares/authentication';
import * as loginRoute from '../controllers/login.controller';
import * as userRoute from '../controllers/user.controller';
import * as postRoute from '../controllers/post.conrtoller';

const router = Router();

router.post('/login', loginRoute.singIn);

router.get('/usuario', [vToken, verificaAdmRol],  userRoute.getUser);
router.get('/usuario/:id', vToken, userRoute.getUserById);
router.post('/usuario', userRoute.postUser);
router.put('/usuario/:id', vToken, userRoute.putUser);
router.delete('/usuario/:id', vToken, userRoute.deleteUser);

router.get('/post', vToken, postRoute.getPost);
router.get('/post/:id', vToken, postRoute.getPostById);
router.post('/post', vToken, postRoute.postPost);
router.put('/post/:id', vToken, postRoute.putPost);
router.delete('/post/:id', vToken, postRoute.deletePost);

export default router;