import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Career, Major, Specialization, Unit } from "../types"

const calcHeight = () => (Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0))

export function useRemainingHeight(headerHeight: number = 64, desiredBottomMargin: number = 0): number {
  // Viewport height - element.offset.top - desired bottom margin
  const [vh, setVH] = useState(calcHeight() - headerHeight - desiredBottomMargin)
  useEffect(() => {
    const onResize = () => {
      setVH(calcHeight() - headerHeight - desiredBottomMargin);
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    }
  })
  return vh
}

export function useSpecializations() {
  return useQuery("specs", async (): Promise<AxiosResponse<Array<Specialization>>> => {
    return await axios.get(`https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getallspecs`)
  }, {
    staleTime: Infinity,
    retry: false
  })
}

export function useUnits() {
  return useQuery('units', async (): Promise<AxiosResponse<Array<Unit>>> => {
    //return await axios.get(`${process.env.REACT_APP_UNIT_API}/getallunits`)
    return await axios.get("https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getallunits")
  }, {
    staleTime: Infinity,
    retry: false
  })
}

export function useCareers() {
  return useQuery("careers", async (): Promise<AxiosResponse<Array<Career>>> => {
    //return await axios.get(`${process.env.REACT_APP_CAREER_API}/events/event-get-all-careers`)
    return await axios.get("https://q02l9qoni6.execute-api.ap-southeast-2.amazonaws.com/Prod/events/event-get-all-careers")
  }, {
    staleTime: Infinity,
    retry: false
  })
}

export function useMajors() {
  return useQuery('majors', async (): Promise<AxiosResponse<Array<Major>>> => {
    //return await axios.get(`${process.env.REACT_APP_UNIT_API}/getallmajors`)
    return await axios.get("https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getallmajors")
  }, {
    staleTime: Infinity,
    retry: false
  })
}

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 25/09/2021
 * Description: Hook for getting a career
 */
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

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 25/09/2021
 * Description: Hook for getting a major
 */
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

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 25/09/2021
 * Description: Hook for getting a specialization
 */
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

