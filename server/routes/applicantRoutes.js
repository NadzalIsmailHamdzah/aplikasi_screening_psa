// server/routes/applicantRoutes.js
import express from 'express';
import * as applicantController from '../controllers/applicantController.js';
import upload from '../middleware/multerConfig.js';
import authMiddleware from '../middleware/authMiddleware.js'; 

const router = express.Router();

router.post('/', upload.single('photo'), applicantController.store);

router.get('/', authMiddleware, applicantController.index);
router.get('/:id', authMiddleware, applicantController.show);
router.delete('/:id', authMiddleware, applicantController.destroy);

export default router;