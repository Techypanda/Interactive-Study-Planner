import axios, { AxiosResponse } from "axios"
import { useQuery } from "react-query"

export function useUnits() {
  return useQuery('units', async (): Promise<AxiosResponse<Array<Unit>>> => {
    return await axios.get(`${process.env.REACT_APP_UNIT_API}/getallunits`)
  }, {
    staleTime: Infinity,
    retry: false
  })
}

export function useUnit(unitCode: string) {
  return useQuery(`unit - ${unitCode}`, async (): Promise<AxiosResponse<Unit>> => {
    return await axios.get(`${process.env.REACT_APP_UNIT_API}/getunit?code=${unitCode}`)
  }, {
    retry: false
  })
}

export function useMajors() {
  return useQuery('majors', async (): Promise<AxiosResponse<Array<Major>>> => {
    return await axios.get(`${process.env.REACT_APP_UNIT_API}/getallmajors`)
  }, {
    staleTime: Infinity,
    retry: false
  })
}

export function useMajor(majorCode: string) {
  return useQuery(`major - ${majorCode}`, async (): Promise<AxiosResponse<Major>> => {
    return await axios.get(`${process.env.REACT_APP_UNIT_API}/getmajor?code=${majorCode}`)
  }, {
    retry: false
  })
}