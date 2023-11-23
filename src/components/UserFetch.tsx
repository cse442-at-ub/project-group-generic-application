import React, { useEffect } from 'react';
import axios from 'axios';

type UserFetchProps = {
  setUser: (user: { Username: string }) => void;
};

const UserFetch: React.FC<UserFetchProps> = ({ setUser }) => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/UserFetch.php', { withCredentials: true });
        if (response.data?.Username) {
          setUser({ Username: response.data.Username });
        } else {
          console.error('Invalid response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [setUser]);

  return null;
};

export default UserFetch;