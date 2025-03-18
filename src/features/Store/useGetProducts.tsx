import { getCollectionFireBase } from "@/services/FireBaseApi";
import { useQuery } from "@tanstack/react-query";
import { ProductType } from "../Products/productForm";


const useGetProducts = () => {
  const { data: products,isLoading,error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getCollectionFireBase<ProductType>("products"),
  });

  return {products,isLoading,error}
};

export default useGetProducts;
