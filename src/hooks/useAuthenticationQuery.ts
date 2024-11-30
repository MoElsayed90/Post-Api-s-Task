import { AxiosRequestConfig } from "axios";
import axiosInstance from "../config/axios.config";
import { useQuery } from "@tanstack/react-query";
export interface IAuthenticationQuery{
  queryKey:string[];
  url:string;
  config?:AxiosRequestConfig;
}


const useAuthenticationQuery = ({queryKey,url,config}:IAuthenticationQuery) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get(url,config)
      return data
    },
})
}
export default useAuthenticationQuery;

