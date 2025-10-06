import React, { useState } from "react";
import { Link } from 'react-router-dom';
import PhotoUpload from "../components/PhotoUpload"; // Asumsi komponen ini ada
import SkillRating from "../components/SkillRating"; // Asumsi komponen ini ada
import { createApplicant } from "../services/applicantService"; // <-- 1. IMPORT SERVICE

const ApplicantForm = () => {
  const initialFormState = {
    photo: null,
    fullName: "",
    email: "",
    phone: "",
    communicationSkill: "",
    publicSpeakingSkill: "",
    teamworkSkill: "",
    leadershipSkill: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State baru untuk menampilkan pesan di UI
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhotoChange = (file, error) => {
    setFormData((prev) => ({ ...prev, photo: file }));
    if (error) {
      setErrors((prev) => ({ ...prev, photo: error }));
    } else {
      setErrors((prev) => ({ ...prev, photo: "" }));
    }
  };

  const handleSkillSelect = (skill, value) => {
    setFormData((prev) => ({ ...prev, [skill]: value }));
    if (errors[skill]) {
      setErrors((prev) => ({ ...prev, [skill]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.photo) newErrors.photo = "Foto wajib diupload";
    if (!formData.fullName.trim())
      newErrors.fullName = "Nama lengkap wajib diisi";
    if (!formData.email.trim()) newErrors.email = "Email wajib diisi";
    if (!formData.phone.trim()) newErrors.phone = "Nomor telepon wajib diisi";
    if (!formData.communicationSkill)
      newErrors.communicationSkill = "Skill komunikasi wajib dipilih";
    if (!formData.publicSpeakingSkill)
      newErrors.publicSpeakingSkill = "Skill public speaking wajib dipilih";
    if (!formData.teamworkSkill)
      newErrors.teamworkSkill = "Skill teamwork wajib dipilih";
    if (!formData.leadershipSkill)
      newErrors.leadershipSkill = "Skill leadership wajib dipilih";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    return newErrors;
  };

  // --- 2. MODIFIKASI BAGIAN HANDLE SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" }); // Reset pesan setiap kali submit

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Membuat objek FormData untuk dikirim ke API
    const submissionData = new FormData();
    // Gunakan loop untuk menambahkan semua data dari state ke FormData
    for (const key in formData) {
      if (formData[key]) {
        // Pastikan hanya data yang ada yang dikirim
        submissionData.append(key, formData[key]);
      }
    }

    try {
      // Panggil API untuk membuat applicant baru
      const response = await createApplicant(submissionData);

      // Tampilkan pesan sukses dari server
      setMessage({
        type: "success",
        text: response.message || "Data berhasil dikirim!",
      });

      // Reset form setelah berhasil
      setFormData(initialFormState);
      setErrors({});
      // Anda perlu menambahkan fungsi reset di komponen PhotoUpload jika ada
    } catch (error) {
      // Tampilkan pesan error dari server
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Terjadi kesalahan. Silakan coba lagi.";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setIsSubmitting(false);
      window.scrollTo(0, 0); // Scroll ke atas untuk melihat pesan
    }
  };

  const skills = [
    { key: "communicationSkill", title: "Komunikasi" },
    { key: "publicSpeakingSkill", title: "Public Speaking" },
    { key: "teamworkSkill", title: "Teamwork" },
    { key: "leadershipSkill", title: "Leadership" },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <nav className="w-full flex justify-end mb-6 ">
        <Link to="/Login" className="bg-black px-4 py-2 rounded-xl">
            <p className="text-white">
              Login
            </p>
        </Link>
      </nav>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-center font-bold text-2xl text-black">
              Punya Skill Academy
            </h1>
          </div>

          {/* --- 3. TAMPILKAN PESAN SUKSES/ERROR --- */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-md text-center ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <PhotoUpload
              onPhotoChange={handlePhotoChange}
              error={errors.photo}
              // Tambahkan prop untuk me-reset preview jika diperlukan
            />

            {/* Input fields tetap sama */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium mb-2 text-black"
              >
                Nama Lengkap *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Masukkan nama lengkap"
              />
              {errors.fullName && (
                <span className="text-sm text-red-500">{errors.fullName}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-black"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="nama@email.com"
              />
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium mb-2 text-black"
              >
                Nomor Telepon *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="08xxxxxxxxxx"
              />
              {errors.phone && (
                <span className="text-sm text-red-500">{errors.phone}</span>
              )}
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 text-black">
                Penilaian Skill (1-4)
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Beri penilaian pada diri Anda untuk skill berikut
              </p>
              {skills.map((skill) => (
                <SkillRating
                  key={skill.key}
                  title={skill.title}
                  skill={skill.key}
                  selectedValue={formData[skill.key]}
                  onSelect={handleSkillSelect}
                  error={errors[skill.key]}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Mengirim..." : "Kirim Pendaftaran"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicantForm;
