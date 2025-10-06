'use strict';
const bcrypt = require('bcryptjs'); // Impor bcryptjs untuk hashing

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash password sebelum dimasukkan ke database
    const hashedPassword = await bcrypt.hash('admin123123', 10); // Ganti 'password123' dengan password yang aman

    await queryInterface.bulkInsert('users', [{
      email: 'admin@mail.com', 
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    // Kode ini akan berjalan jika Anda perlu membatalkan seeder
    await queryInterface.bulkDelete('users', { email: 'admin@mail.com' }, {});
  }
};