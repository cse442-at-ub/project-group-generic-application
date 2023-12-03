import React, { useEffect, useState } from 'react';
import axios from 'axios';

type UserFetchProps = {
  setUser: (user: { Username: string }) => void;
};

const UserFetch: React.FC<UserFetchProps> = ({ setUser }) => {
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    if (isFetching) {
      const fetchUser = async () => {
        try {
          const response = await axios.get('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/UserFetch.php', {
            withCredentials: true,
            cancelToken: cancelTokenSource.token
          });
          if (response.data?.Username) {
            setUser({ Username: response.data.Username });
          } else {
            console.error('Invalid response structure:', response);
          }
        } catch (error) {
          if (!axios.isCancel(error)) {
            console.error('Error fetching user:', error);
          }
        }
      };

      fetchUser().then(() => setIsFetching(false));
    }

    return () => {
      cancelTokenSource.cancel('Component unmounted or effect re-running');
    };
  }, [setUser]);

  return null;
};

export default UserFetch;