import queryString from 'query-string';

const useQuery = () => {
  const result = queryString.parse(location.search);
  return result;
};

export default useQuery;
