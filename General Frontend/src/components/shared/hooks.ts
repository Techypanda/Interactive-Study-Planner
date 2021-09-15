import axios, { AxiosResponse } from "axios";
import { useQuery } from 'react-query'


export function useUnits() {
  return useQuery('units', async (): Promise<AxiosResponse<Array<any>>> => {
    //return await axios.get(`${process.env.REACT_APP_UNIT_API}/getallunits`)
    return await axios.get("https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getallunits")
  }, {
    staleTime: Infinity,
    retry: false
  })
}



export function useCareers() {
  return useQuery("careers", async (): Promise<AxiosResponse<Array<any>>> => {
    //return await axios.get(`${process.env.REACT_APP_CAREER_API}/events/event-get-all-careers`)
    return await axios.get("https://q02l9qoni6.execute-api.ap-southeast-2.amazonaws.com/Prod/events/event-get-all-careers")
  }, {
    staleTime: Infinity,
    retry: false
  })
}


export function useMajors() {
  return useQuery('majors', async (): Promise<AxiosResponse<Array<any>>> => {
    //return await axios.get(`${process.env.REACT_APP_UNIT_API}/getallmajors`)
    return await axios.get("https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getallmajors")
  }, {
    staleTime: Infinity,
    retry: false
  })
}