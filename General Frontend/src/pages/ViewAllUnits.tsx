import {EntryProps} from "../types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";

// per Ricky's request, this is an incredibly simple page where all the units available to a biomedical student
// is displayed with relatively minimal info i.e. name, code, and a brief course

function GetAllUnits() {
    const { isLoading, isError, error, data} = useQuery('getunits', async () => {
        const data = await axios('${process.env.REACT_APP_UNITS_API}/getunit');
        return data;
    });
    
    if (isLoading) {
        return "Retrieving all available courses"; 
    }
    if (isError) {
        return error; 
    }
    
    return (
	<div>
          <ul>
          </ul>
        </div>
    );
}

export default GetAllUnits;
