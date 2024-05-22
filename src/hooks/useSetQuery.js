import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';

const useSetQuery = () => {
  const navigate = useNavigate();

  const setQuery = (params) => {
    const searchParams = queryString.stringify(params, { encode: false });
    navigate(`?${searchParams}`);
  };

  return setQuery;
};

export default useSetQuery;
