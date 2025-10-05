import express from 'express';
import * as applicantController from '../controllers/applicantController.js';
import upload from '../middleware/multerConfig.js';

const router = express.Router();

// POST /api/applicants
router.post('/', upload.single('photo'), applicantController.store);

// GET /api/applicants
router.get('/', applicantController.index);

// GET /api/applicants/:id
router.get('/:id', applicantController.show);

// DELETE /api/applicants/:id
router.delete('/:id', applicantController.destroy);

export default router;