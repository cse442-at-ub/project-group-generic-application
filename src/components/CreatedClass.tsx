import React, { useEffect, useState } from 'react';
import axios from 'axios';
type ClassWithCode = {
  classname: string;
  code: string;
};

type ClassesFetcherProps = {
  setClassesCreated: (classes: ClassWithCode[]) => void;
};

const ClassesFetcher: React.FC<ClassesFetcherProps> = ({ setClassesCreated }) => {
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    if (isFetching) {
      const fetchClasses = async () => {
        try {
          const response = await axios.get('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/CreatedClass.php', {
            withCredentials: true,
            cancelToken: cancelTokenSource.token
          });
          if (response.data?.CreatedClass) {
            setClassesCreated(response.data.CreatedClass);
          } else {
            console.error('Invalid response structure:', response);
          }
        } catch (error) {
          if (!axios.isCancel(error)) {
            console.error('Error fetching classes:', error);
          }
        }
      };

      fetchClasses().then(() => setIsFetching(false));
    }

    return () => {
      cancelTokenSource.cancel('Component unmounted or effect re-running');
    };
  }, [setClassesCreated, isFetching]);

  return null;
};

export default ClassesFetcher;