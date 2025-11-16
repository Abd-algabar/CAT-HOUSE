import express from 'express';
import{CreateUser,LoginUser, verifyToken,MyAccount} from '../controllers/UserController.js';
import { auth   } from '../middleware/auth.js';
const userRouter=express.Router();

userRouter.post('/register',CreateUser);

userRouter.post('/login',LoginUser);

userRouter.get('/verify',auth,verifyToken);

userRouter.get("/me",auth,MyAccount)

export default userRouter;
