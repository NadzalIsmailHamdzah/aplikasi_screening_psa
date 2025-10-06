import React, { useState } from 'react';

const PhotoUpload = ({ onPhotoChange, error }) => {
  const [photoPreview, setPhotoPreview] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validasi file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      onPhotoChange(null, 'Format file tidak valid. Gunakan JPG, PNG, atau WEBP');
      return;
    }

    // Validasi file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      onPhotoChange(null, 'Ukuran file terlalu besar. Maksimal 5MB');
      return;
    }

    onPhotoChange(file, '');

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhotoPreview('');
    onPhotoChange(null, '');
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Pas Foto *</label>
      <div className="space-y-4">
        {photoPreview && (
          <div className="relative inline-block">
            <img 
              src={photoPreview} 
              alt="Preview" 
              className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
            />
            <button
              type="button"
              onClick={removePhoto}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        )}

        {!photoPreview && (
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              id="photoInput"
            />
            <button
              type="button"
              onClick={() => document.getElementById('photoInput').click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Upload Foto
            </button>
            <p className="text-xs text-gray-500 mt-2">Format: JPG, PNG, Max: 5MB</p>
          </div>
        )}
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </div>
  );
};

export default PhotoUpload;