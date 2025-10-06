import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getApplicants } from '../services/applicantService.js';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-8">
      <header className="w-full flex justify-between items-center mb-8 mx-auto">
        <p className="text-2xl font-bold text-gray-900">Punya Skill Academy</p>
        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors"
        >
          Log Out
        </button>
      </header>
      <main className="max-w-6xl mx-auto">{children}</main>
    </div>
  );
};

const ApplicantCard = ({ applicant }) => (
  <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center p-4">
      <img 
        src={`http://localhost:5000${applicant.photo}`} 
        alt={applicant.fullName} 
        className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200 mr-6 flex-shrink-0"
      />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{applicant.fullName}</h3>
          <p className="text-sm text-gray-600 mt-1">{applicant.email}</p>
        </div>
        <div className="text-sm text-gray-500">
          <p>Mendaftar pada:</p>
          <p>{new Date(applicant.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
      <Link to={`/admin/applicants/${applicant.id}`} className="ml-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
        <p className="text-white">
            Lihat Detail
        </p>
      </Link>
    </div>
  </div>
);

const ApplicantListPage = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const data = await getApplicants();
        setApplicants(data);
      } catch (error) {
        console.error('Error fetching applicants:', error);
        if (error.response && error.response.status === 401) {
          setError('Sesi Anda telah berakhir. Silakan login kembali.');
          localStorage.removeItem('token');
        } else {
          setError('Gagal memuat data. Silakan coba lagi nanti.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []); 


  if (loading) {
    return (
      <AdminLayout title="Daftar Pelamar">
        <div className="flex items-center justify-center p-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Error">
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-red-500">{error}</p>
            {error.includes("Sesi") && (
              <Link to="/login" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg">
                Ke Halaman Login
              </Link>
            )}
          </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Daftar Pelamar">
      {/* <p className="text-gray-600 -mt-6 mb-8">Kelola data pelamar yang telah mendaftar.</p> */}

      {applicants.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada data pelamar</h3>
          <p className="text-gray-600 mb-6">Belum ada pelamar yang mendaftar melalui form.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applicants.map((applicant) => (
            <ApplicantCard key={applicant.id} applicant={applicant} />
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default ApplicantListPage;