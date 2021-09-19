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

export function useCareer(careerCode: string)
{
    return useQuery(`career - ${careerCode}`, async (): Promise<AxiosResponse<any>> => {
        return await axios.post('https://q02l9qoni6.execute-api.ap-southeast-2.amazonaws.com/Prod/events/event-get-career',//`${process.env.REACT_APP_CAREERS_API}/events/event-get-career`,
            {
                'CareerId': careerCode
            }
        )
    },
    {
      staleTime: Infinity,
      retry: false
    });
}

export function useMajor(majorCode: string)
{
    return useQuery(`major - ${majorCode}`, async (): Promise<AxiosResponse<any>> => {
        return await axios.get('https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getmajor',//'${process.env.REACT_APP_UNITS_API}/getmajor',
            { params:
                {
                    code : majorCode
                }
            }
        )
    },
    {
      staleTime: Infinity,
      retry: false
    });
}

export function useSpecialization(specCode: string)
{
    return useQuery(`specialization - ${specCode}`, async (): Promise<AxiosResponse<any>> => {
        return await axios.get('https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getspec',//'${process.env.REACT_APP_UNITS_API}/getspec',
            { params:
                {
                    code : specCode
                }
            }
        )
    },
    {
      staleTime: Infinity,
      retry: false
    });
}

export function useUnit(unitCode: string)
{
    return useQuery(`unit - ${unitCode}`, async (): Promise<AxiosResponse<any>> => {
        return await axios.get('https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getunit',//'${process.env.REACT_APP_UNITS_API}/getunit',
            { params:
                {
                    code : unitCode
                }
            }
        )
    },
    {
      staleTime: Infinity,
      retry: false
    });
}
