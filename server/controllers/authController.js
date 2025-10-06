// server/controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Fungsi untuk Register Admin (jalankan sekali via Postman untuk membuat user)
export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Cek jika user sudah ada
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ message: 'User sudah terdaftar' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Buat user baru
        user = await User.create({ email, password: hashedPassword });
        res.status(201).json({ message: 'User berhasil dibuat' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Fungsi untuk Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Cek user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Email atau password salah' });
        }

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email atau password salah' });
        }

        // Buat dan kirim token JWT
        const payload = { user: { id: user.id } };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }, // Token berlaku selama 1 jam
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};