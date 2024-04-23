import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';

const useSetQuery = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const setQuery = (params) => {
    const currentSearch = queryString.parse(location.search);
    const newSearch = queryString.stringify({ ...currentSearch, ...params });
    navigate(`?${newSearch}`);
  };

  return setQuery;
};

export default useSetQuery;
