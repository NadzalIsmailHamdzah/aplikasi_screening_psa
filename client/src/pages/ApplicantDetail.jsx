import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getApplicantById, deleteApplicant } from '../services/applicantService';

// Placeholder untuk AdminLayout. Idealnya ini menjadi file terpisah di src/components/
const AdminLayout = ({ children }) => (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-8">{children}</div>
);

const ApplicantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        setLoading(true);
        const data = await getApplicantById(id);
        setApplicant(data);
      } catch (error) {
        console.error('Error fetching applicant detail:', error);
        setError('Gagal memuat detail pelamar atau data tidak ditemukan.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicant();
  }, [id]); // Dependensi [id] agar data di-fetch ulang jika id di URL berubah

  const handleDelete = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data pelamar ini? Aksi ini tidak dapat dibatalkan.')) {
      try {
        await deleteApplicant(id);
        alert('Data pelamar berhasil dihapus.');
        navigate('/admin/applicants'); // Arahkan kembali ke halaman daftar setelah berhasil
      } catch (error) {
        console.error('Error deleting applicant:', error);
        alert('Gagal menghapus data.');
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
        <AdminLayout>
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500 text-center">{error}</p>
            </div>
        </AdminLayout>
    );
  }
  
  if (!applicant) {
     return <AdminLayout><div className="text-center p-10">Data pelamar tidak ditemukan.</div></AdminLayout>
  }
  
  const skills = [
    { name: 'Komunikasi', rating: applicant.communicationSkill },
    { name: 'Public Speaking', rating: applicant.publicSpeakingSkill },
    { name: 'Teamwork', rating: applicant.teamworkSkill },
    { name: 'Leadership', rating: applicant.leadershipSkill }
  ];

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/admin/applicants" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Kembali ke Daftar
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Detail Pelamar</h1>
        </div>

        {/* Applicant Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 p-6 text-white">
            <div className="flex items-center gap-6">
              <img
                src={`http://localhost:5000${applicant.photo}`}
                alt={applicant.fullName}
                className="w-24 h-30 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{applicant.fullName}</h1>
                <div className="flex items-center gap-4 mt-3 text-white/80">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span className="text-sm">Bergabung {new Date(applicant.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="p-8 space-y-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi Kontak</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{applicant.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  <div>
                    <p className="text-sm text-gray-600">Telepon</p>
                    <p className="font-medium text-gray-900">{applicant.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skill Ratings */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Penilaian Skill</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{skill.name}</span>
                      <span className="text-lg font-bold text-blue-600">{skill.rating}/4</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full transition-all duration-300" style={{ width: `${(skill.rating / 4) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center mt-8 pt-6 border-t border-gray-200">
          <button onClick={handleDelete} className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            Hapus Data
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ApplicantDetailPage;