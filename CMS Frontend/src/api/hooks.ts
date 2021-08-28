import axios, { AxiosResponse } from "axios"
import { useQuery } from "react-query"
import { Unit } from "../types"

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