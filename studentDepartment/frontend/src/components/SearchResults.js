import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const name = query.get('name');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/v1/student/search?name=${name}`);
        setStudents(response.data.students);
        setLoading(false);
      } catch (error) {
        setError('Error fetching students');
        setLoading(false);
      }
    };

    if (name) {
      fetchStudents();
    } else {
      setLoading(false);
    }
  }, [name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Search Results</h2>
      {students.length > 0 ? (
        students.map((student) => (
          <div key={student._id}>
            <p>{student.name}</p>
            {/* Add more student details as needed */}
          </div>
        ))
      ) : (
        <p>No students found</p>
      )}
    </div>
  );
};

export default SearchResults;