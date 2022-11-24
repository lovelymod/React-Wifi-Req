import express from "express";
import {
    getUsers, 
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getIP
} from "../controllers/UserController.js";

const router = express.Router();

router.get('/getusers', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/updateusers', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/getip', getIP);

export default router;