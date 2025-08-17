import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const usePublishers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ['publishers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/publishers');
      return res.data;
    }
  });

  return { publishers, isLoading };
};

export default usePublishers;
