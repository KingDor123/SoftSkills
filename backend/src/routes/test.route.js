import { Router } from 'express';
import { db } from '../config/db.js';
import { TestRepository } from '../repositories/test.repository.js';
import { TestService } from '../services/test.service.js';
import { TestController } from '../controllers/test.controller.js';

const repository = new TestRepository(db);
const service = new TestService(repository);
const controller = new TestController(service);

const router = Router();

router.get('/', controller.getOne);

export default router;