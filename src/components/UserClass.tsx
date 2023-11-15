import React, { useEffect } from 'react';
import axios from 'axios';

type ClassesFetcherProps = {
  setClassesJoined: (classes: string[]) => void;
};

const ClassesFetcher: React.FC<ClassesFetcherProps> = ({ setClassesJoined }) => {
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/Loginbackend.php', { withCredentials: true });
        if (response.data?.$response1) {
          setClassesJoined(response.data.$response1);
        } else {
          console.error('Invalid response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };
  
    fetchClasses();
  }, [setClassesJoined]);

  return null;
};

export default ClassesFetcher;