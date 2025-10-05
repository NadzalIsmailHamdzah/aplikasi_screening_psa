import Applicant from '../models/Applicant.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// POST /api/applicants
export const store = async (req, res) => {
    try {
        const { fullName, email, phone, communicationSkill, publicSpeakingSkill, teamworkSkill, leadershipSkill } = req.body;
        const photoPath = req.file ? `/uploads/photos/${req.file.filename}` : null;

        const newApplicant = await Applicant.create({
            fullName, email, phone,
            communicationSkill, publicSpeakingSkill,
            teamworkSkill, leadershipSkill,
            photo: photoPath
        });

        res.status(201).json({
            success: true,
            message: 'Data berhasil disimpan!',
            data: newApplicant
        });
    } catch (error) {
        console.error("Store Error:", error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// GET /api/applicants
export const index = async (req, res) => {
    try {
        const applicants = await Applicant.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(applicants);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// GET /api/applicants/:id
export const show = async (req, res) => {
    try {
        const applicant = await Applicant.findByPk(req.params.id);
        if (!applicant) {
            return res.status(404).json({ success: false, message: 'Data pelamar tidak ditemukan' });
        }
        res.status(200).json(applicant);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// DELETE /api/applicants/:id
export const destroy = async (req, res) => {
    try {
        const applicant = await Applicant.findByPk(req.params.id);
        if (!applicant) {
            return res.status(404).json({ success: false, message: 'Data pelamar tidak ditemukan' });
        }

        if (applicant.photo) {
            const filePath = path.join(__dirname, '..', 'public', applicant.photo);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await applicant.destroy();
        res.status(200).json({ success: true, message: 'Data pelamar berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};