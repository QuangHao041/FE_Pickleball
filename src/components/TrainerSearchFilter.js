import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/screens/TrainerSearchFilter.css'; // Ensure to create this CSS file for custom styles

const TrainerSearchFilter = ({ onSearch }) => {
  const [trainerName, setTrainerName] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');

  // Experience levels from 1 to 10
  const experienceLevels = Array.from({ length: 10 }, (_, index) => index + 1);

  const handleSearch = () => {
    onSearch({ trainerName, experienceLevel });
  };

  const handleReset = () => {
    setTrainerName('');
    setExperienceLevel('');
    onSearch({ trainerName: '', experienceLevel: '' }); // Reset search data
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-3 filter-container">
      <input
        type="text"
        placeholder="Huấn luyện viên gần bạn"
        value={trainerName}
        onChange={(e) => setTrainerName(e.target.value)}
        className="form-control me-2 rounded-pill"
        
      />
      <select
        value={experienceLevel}
        onChange={(e) => setExperienceLevel(e.target.value)}
        className="form-select me-2 rounded-pill"
      >
        <option value=""><div>Trình độ của huấn luyện viên</div></option>
        {experienceLevels.map(level => (
          <option key={level} value={level}>Level {level}</option>
        ))}
      </select>
      <button
        onClick={handleSearch}
        className="btn btn-search"
      >
        Tìm Kiếm
      </button>
      <button
        className="btn btn-link text-decoration-none"
        onClick={handleReset}
      >
        Xóa
      </button>
    </div>
  );
};

export default TrainerSearchFilter;
