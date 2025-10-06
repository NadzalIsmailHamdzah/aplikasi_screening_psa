import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // Ambil token dari header
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Akses ditolak, tidak ada token' });
    }

    try {
        // Verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Simpan payload user ke request
        next(); // Lanjutkan ke controller
    } catch (err) {
        res.status(401).json({ message: 'Token tidak valid' });
    }
};

export default authMiddleware;