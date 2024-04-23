import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  const location = useLocation();
  // const query = location.search.slice(1, location.search.length);
  // const queryArr = query.split('&');
  // const result = queryArr.reduce((acc, query) => {
  //   const [name, value] = query.split('=');
  //   acc[name] = value;
  //   return acc;
  // }, {});
  const result = queryString.parse(location.search);
  return result;
};

export default useQuery;
