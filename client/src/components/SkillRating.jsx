import React from 'react';

const SkillRating = ({ title, skill, selectedValue, onSelect, error }) => {
  const ratings = [
    { value: '1', label: 'Kurang' },
    { value: '2', label: 'Cukup' },
    { value: '3', label: 'Baik' },
    { value: '4', label: 'Sangat Baik' }
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-3 text-black">
        {title} {error && <span className="text-red-500 text-sm">* {error}</span>}
      </label>
      <div className="flex gap-2">
        {ratings.map(rating => {
          const isSelected = selectedValue === rating.value;
          return (
            <div key={rating.value} className="flex-1">
              <input
                type="radio"
                name={skill}
                value={rating.value}
                id={`${skill}${rating.value}`}
                checked={isSelected}
                onChange={() => onSelect(skill, rating.value)}
                className="hidden"
              />
              <label
                htmlFor={`${skill}${rating.value}`}
                className={`skill-rating-option block py-3 px-4 text-center border-2 rounded-lg cursor-pointer transition-all duration-200 text-black ${
                  isSelected 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'border-gray-200 hover:scale-105'
                }`}
              >
                <div className="font-semibold">{rating.value}</div>
                <div className="text-xs mt-1">{rating.label}</div>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillRating;