import axios, { AxiosResponse } from "axios"
import { useQuery } from "react-query"
import { CareerProps } from "../../types"

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
        return await await axios.get('https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getmajor',//'${process.env.REACT_APP_UNITS_API}/getmajor',
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
        return await await axios.get('https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getspec',//'${process.env.REACT_APP_UNITS_API}/getspec',
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
        return await await axios.get('https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getunit',//'${process.env.REACT_APP_UNITS_API}/getunit',
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