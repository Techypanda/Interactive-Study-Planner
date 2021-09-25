import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Specialization } from "../types"
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