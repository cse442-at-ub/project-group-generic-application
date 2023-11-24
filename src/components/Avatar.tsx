import React, { useEffect } from 'react';
import axios from 'axios';

type AvatarFetchProps = {
    username: string;
    setUserAvatar: (avatar: string | null) => void;
};

const AvatarFetch: React.FC<AvatarFetchProps> = ({ username, setUserAvatar }) => {
    useEffect(() => {
      const fetchAvatar = async () => {
        try {
          const response = await axios.get('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/AvatarFetch.php', {
            params: { username }
          });
          if (response.data && response.data.avatarId) {
            const avatarPath = `https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/avatar/avatar${response.data.avatarId}.png`;
            setUserAvatar(avatarPath);
            localStorage.setItem('userAvatar', avatarPath);
          } else {
            setUserAvatar(null);
            localStorage.removeItem('userAvatar');
          }
        } catch (error) {
          console.error('Error fetching user avatar:', error);
          setUserAvatar(null);
          localStorage.removeItem('userAvatar');
        }
      };
  
      if (username) {
        fetchAvatar();
      }
    }, [username, setUserAvatar]);
  
    return null;
  };

export default AvatarFetch;