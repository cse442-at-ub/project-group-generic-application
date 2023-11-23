import React, { useEffect } from 'react';
import axios from 'axios';

type PointsFetcherProps = {
    setUserPoints: (points: number) => void;
  };

  const PointsFetcher: React.FC<PointsFetcherProps> = ({ setUserPoints }) => {
    useEffect(() => {
        const fetchPoints = async () => {
          try {
            const response = await axios.get('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/PointsFetch.php', { withCredentials: true });
            if (response.data?.success) {
              setUserPoints(response.data.data.points);
            } else if (response.data?.error) {
              console.error(response.data.error);
              setUserPoints(0);
            } else {
              console.error('Invalid response structure:', response);
              setUserPoints(0);
            }
          } catch (error) {
            console.error('Error fetching user points:', error);
            setUserPoints(0);
          }
        };
    
        fetchPoints();
      }, [setUserPoints]);
      return null;
    };
export default PointsFetcher;