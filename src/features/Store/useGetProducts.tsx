import { getCollectionFireBase } from "@/services/FireBaseApi";
import { useQuery } from "@tanstack/react-query";


const useGetProducts = () => {
  const { data: products,isLoading,error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getCollectionFireBase("products"),
  });

  return {products,isLoading,error}
};

export default useGetProducts;
