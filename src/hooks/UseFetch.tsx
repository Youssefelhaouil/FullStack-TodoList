import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Config/axios.config";
import { AxiosRequestConfig } from "axios";

interface IPram{
    queryKey:string[],
    url:string,
    config?: AxiosRequestConfig
}
const useFetch = ({queryKey,url,config}:IPram) => {
  return useQuery({
    queryKey:[`${queryKey}`],
    queryFn: async () => {
      const {data} = await axiosInstance.get(`${url}`,config);
      return data;
    },
  });
};
export default useFetch;
