import {UnitEntryProps} from "../types";

// per Ricky's request, this is an incredibly simple page where all the units available to a biomedical student
// is displayed with relatively minimal info i.e. name, code, and a brief course description.


function GetUnits(): Promise<UnitEntryProps[]> {
    return fetch()
    .then(res => res.json('/units.json'))
    .then(res => {
	return res as UnitEntryProps[];
    });
}

function ListUnits() {
    const units_list = GetUnits();
    return(
  <>
    {units_list}
  </>
    )
}

export default ListUnits; 
