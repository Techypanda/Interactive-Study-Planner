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

export function useSpecializations() {
  return useQuery("specs", async (): Promise<AxiosResponse<Array<Specialization>>> => {
    return await axios.get(`${process.env.REACT_APP_UNIT_API}/getallspecs`)
  }, {
    staleTime: Infinity,
    retry: false
  })
}

export function useSpecialization(specCode: string) {
  return useQuery(`spec - ${specCode}`, async (): Promise<AxiosResponse<Specialization>> => {
    return await axios.get(`${process.env.REACT_APP_UNIT_API}/getspec?code=${specCode}`)
  }, {
    staleTime: Infinity,
    retry: false
  })
}

export function useCareers() {
  return useQuery("careers", async (): Promise<AxiosResponse<Array<Career>>> => {
    return await axios.get(`${process.env.REACT_APP_CAREER_API}/events/event-get-all-careers`)
  }, {
    staleTime: Infinity,
    retry: false
  })
}

export function useCareer(careerCode: string) {
  return useQuery(`career - ${careerCode}`, async (): Promise<AxiosResponse<Career>> => {
    return await axios.post(`${process.env.REACT_APP_CAREER_API}/events/event-get-career`, JSON.stringify({
      CareerId: careerCode
    }))
  }, {
    staleTime: Infinity,
    retry: false
  })
}