# aplikasi_screening_psa

## 🚀 Panduan Instalasi & Menjalankan Proyek

Berikut adalah langkah-langkah untuk menjalankan proyek ini di lingkungan lokal.

### ### Prasyarat
- [Node.js](https://nodejs.org/) (v18 atau lebih baru)
- [Git](https://git-scm.com/)
- Server MySQL (misalnya dari [XAMPP](https://www.apachefriends.org/index.html) atau [MySQL Community Server](https://dev.mysql.com/downloads/mysql/))

### ### 1. Backend Setup (`server/`)

1.  **Clone repositori ini:**
    ```bash
    git clone [URL_REPOSITORI_ANDA]
    cd aplikasi-screening-psa
    ```

2.  **Masuk ke direktori server dan install dependensi:**
    ```bash
    cd server
    npm install
    ```

3.  **Buat file `.env`:**
    Salin file `.env.example` (jika ada) atau buat file baru bernama `.env` di dalam folder `server/` dan isi sesuai konfigurasi Anda.

4.  **Setup Database:**
    - Nyalakan server MySQL Anda.
    - Buat database baru menggunakan MySQL Workbench atau phpMyAdmin. Pastikan namanya sama dengan `DB_NAME` di file `.env` Anda.

5.  **Jalankan server backend:**
    ```bash
    npm run dev
    ```
    Server akan berjalan di `http://localhost:5000`.

### ### 2. Frontend Setup (`client/`)

1.  **Buka terminal baru** di direktori root proyek.

2.  **Masuk ke direktori client dan install dependensi:**
    ```bash
    cd client
    npm install
    ```

3.  **Jalankan aplikasi frontend:**
    ```bash
    npm run dev
    ```
    Aplikasi React akan berjalan di `http://localhost:5173` (atau port lain yang tersedia).
