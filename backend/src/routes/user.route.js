import { Router } from 'express';
import { db } from '../config/db.js';
import { UserRepository } from '../repositories/user.repository.js';
import { UserService } from '../services/user.service.js';
import { UserController } from '../controllers/user.controller.js';

const repository = new UserRepository(db);
const service = new UserService(repository);
const controller = new UserController(service);

const router = Router();

router.get('/', controller.getAll);

export default router;