# Aplikasi Screening Peserta PSA

Aplikasi ini adalah sistem untuk melakukan screening dan penilaian calon peserta Pelatihan Vokasi dan Peningkatan Produktivitas (PSA).

## Fitur
- Pendaftaran dan login untuk admin.
- Pendaftaran data pelamar oleh admin.
- Penilaian pelamar berdasarkan berbagai kriteria.
- Unggah foto pelamar.
- Tampilan daftar dan detail pelamar.

## Teknologi yang Digunakan
- **Backend**: Node.js, Express, Sequelize, MySQL
- **Frontend**: React, Vite, Tailwind CSS

## Prasyarat
- [Node.js](https://nodejs.org/) (versi 14 atau lebih tinggi)
- [NPM](https://www.npmjs.com/)
- Server Database [MySQL](https://www.mysql.com/)

## Panduan Instalasi

### 1. Clone Repositori
Clone repositori ini ke mesin lokal Anda:
```bash
git clone https://github.com/NadzalIsmailHamdzah/aplikasi_screening_psa.git
cd aplikasi_screening_psa
```

### 2. Setup Backend
Langkah-langkah untuk menyiapkan dan menjalankan server backend.

1.  **Masuk ke direktori `server`:**
    ```bash
    cd server
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Buat file `.env`:**
    Buat file bernama `.env` di dalam direktori `server` dan isi dengan konfigurasi database Anda.
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=password_database_anda
    DB_NAME=nama_database_anda
    JWT_SECRET=rahasia_jwt_anda
    ```
    Ganti `password_database_anda`, `nama_database_anda`, dan `rahasia_jwt_anda` dengan nilai Anda sendiri.

4.  **Buat Database:**
    Pastikan Anda telah membuat database di MySQL dengan nama yang sama seperti yang Anda tentukan di `DB_NAME`.

5.  **Jalankan Migrasi Database:**
    Perintah ini akan membuat tabel-tabel yang diperlukan di database Anda.
    ```bash
    npx sequelize-cli db:migrate
    ```

6.  **Jalankan Seeder (Opsional):**
    Perintah ini akan menambahkan data awal ke database, seperti akun admin default.
    ```bash
    npx sequelize-cli db:seed:all
    ```
    Akun admin default:
    - **Email**: `admin@example.com`
    - **Password**: `password`

7.  **Jalankan Server Backend:**
    ```bash
    npm run dev
    ```
    Server akan berjalan di `http://localhost:5000`.

### 3. Setup Frontend
Langkah-langkah untuk menyiapkan dan menjalankan aplikasi client.

1.  **Buka terminal baru** dan masuk ke direktori `client`:
    ```bash
    cd client
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Jalankan Server Pengembangan Frontend:**
    ```bash
    npm run dev
    ```
    Aplikasi React akan berjalan di `http://localhost:5173` (atau port lain yang tersedia).

### 4. Selesai!
Sekarang Anda dapat membuka `http://localhost:5173` di browser Anda untuk menggunakan aplikasi.
