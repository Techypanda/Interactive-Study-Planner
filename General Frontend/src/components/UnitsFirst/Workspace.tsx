import { Box, MenuItem, Select, Typography } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Major, Specialization, WorkspaceProps, Unit } from "../../types";
import OptionCardSelect from "./OptionCardSelect";
import PlanExplain from "./PlanExplain";

function sliceIntoPages(arr: Unit[] | Major[] | Specialization[], pageSize = 3): Map<number, Unit[] | Major[] | Specialization[]> {
  let pageMap: Map<number, Unit[] | Major[] | Specialization[]> = new Map();
  let pageNo = 0;
  for (let i = 0; i < arr.length; i += 3) {
    pageMap.set(pageNo, arr.slice(i, i + 3))
    pageNo += 1;
  }
  return pageMap;
}

function Workspace(props: WorkspaceProps) {
  const [view, setView] = useState("Majors");
  const [pages, setPages] = useState<Map<number, Unit[] | Major[] | Specialization[]>>(sliceIntoPages(props.majors));
  const [page, setPage] = useState(0);
  function navPrevious() {
    const prevIDX = page - 1 < 0 ? pages.size - 1 : page - 1;
    setPage(prevIDX);
  }
  function navNext() {
    const nextIDX = page + 1 >= pages.size ? 0 : page + 1;
    setPage(nextIDX);
  }
  useEffect(() => {
    setPage(0);
  }, [pages])
  return (
    <Box p={2} className={props.className}>
      <Box display="flex">
        <Box width="250px" display="inline-block" textAlign="left">
          <Typography align="left">Currently Viewing</Typography>
          <Select
            labelId="select-view"
            value={view}
            fullWidth
            variant="outlined"
            className="leftalign"
            onChange={(e) => {
              setView(e.target.value as string)
              switch (e.target.value) {
                case "Majors":
                  setPages(sliceIntoPages(props.majors));
                  break;
                case "Specializations":
                  setPages(sliceIntoPages(props.specs));
                  break;
                case "Units":
                  setPages(sliceIntoPages(props.units));
                  break;
              }
            }}
          >
            <MenuItem value={"Majors"}>Majors</MenuItem>
            <MenuItem value={"Specializations"}>Specializations</MenuItem>
            <MenuItem value={"Units"}>Units</MenuItem>
          </Select>
        </Box>
        <Box flexGrow={1} />
        <Box display="inline">
          <Typography align="left">What Plans Are Available?</Typography>
          <Typography align="left">At Curtin Medical we support the following type of plans</Typography>
          <Box mb={1}>
            <PlanExplain title={"DOUBLE MAJOR"} explaination={"You can select two majors, this will allow you to specialize into two concise fields"} />
          </Box>
          <Box mb={1}>
            <PlanExplain title={"MAIN MAJOR + 2 INTERNAL SPECIALIZATIONS"} explaination={"You can select a main major, then two internal specializations, this gives the benefit of flexibility while remaining close to our courses."} />
          </Box>
          <Box mb={1}>
            <PlanExplain title={"MAIN MAJOR + 1 INTERNAL SPECIALIZATION + 1 EXTERNAL SPECIALIZATION"} explaination={"You can select a main major, then a internal specialization, then a external specialization, this is currently not official available"} />
          </Box>
          <PlanExplain title={"MAIN MAJOR + 1 INTERNAL SPECIALIZATION + 4 OPTIONAL UNITS"} explaination={"You can a main major then 4 optional units, this will give you the greatest flexibility but comes with the drawback of if you select bad electives you will have a less direct path to some careers"} />
        </Box>
      </Box>
      <Box mt={8} display="flex" justifyContent="center">
        {pages.get(page) &&
          <>
            {pages.get(page)!.length > 1 &&
              <Box px={2}>
                <OptionCardSelect
                  title={pages.get(page)![0].Name}
                  description={pages.get(page)![0].Description}
                  type={view === "Majors" ? "Major" : view === "Specializations" ? `${(pages.get(page)![0] as Specialization).Internal ? "Internal" : "External"} Specialization` : `Semester 
                  ${(pages.get(page)![0] as Unit).Semester === 12 ? "1 & 2" : (pages.get(page)![0] as Unit).Semester} - Unit`}
                  onClick={() => props.select(pages.get(page)![0])}
                />
              </Box>
            }
            {pages.get(page)!.length > 1 && <Box px={2}>
              <OptionCardSelect
                title={pages.get(page)![1].Name}
                description={pages.get(page)![1].Description}
                type={view === "Majors" ? "Major" : view === "Specializations" ? `${(pages.get(page)![1] as Specialization).Internal ? "Internal" : "External"} Specialization` : `Semester 
                ${(pages.get(page)![1] as Unit).Semester === 12 ? "1 & 2" : (pages.get(page)![1] as Unit).Semester} - Unit`}
                onClick={() => props.select(pages.get(page)![1])}
              />
            </Box>}
            {pages.get(page)!.length > 2 && <Box px={2}>
              <OptionCardSelect
                title={pages.get(page)![2].Name}
                description={pages.get(page)![2].Description}
                type={view === "Majors" ? "Major" : view === "Specializations" ? `${(pages.get(page)![2] as Specialization).Internal ? "Internal" : "External"} Specialization` : `Semester 
                ${(pages.get(page)![2] as Unit).Semester === 12 ? "1 & 2" : (pages.get(page)![2] as Unit).Semester} - Unit`}
                onClick={() => props.select(pages.get(page)![2])}
              />
            </Box>}
          </>
        }
      </Box>
      <Box mt={2}>
        <Typography>Currently Viewing: {view}</Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
        <Box mr={2}>
          <NavigateBefore className="navigationIcon" onClick={() => navPrevious()} />
        </Box>
        {Array(pages.size).fill(0).map((_, i) =>
          <Box mx={0.2} key={i} className={`navIndicator ${i === page ? 'activewoopog' : ''}`} display="inline-block" height={15} width={15} borderRadius="100%" onClick={() => setPage(i)} />
        )}
        <Box ml={2}>
          <NavigateNext className="navigationIcon" onClick={() => navNext()} />
        </Box>
      </Box>
      <Box>
        <Typography>Page: {page + 1}/{pages.size}</Typography>
      </Box>
    </Box>
  )
}
export default styled(Workspace)`
.fullWidth {
  width: 100% !important;
}
.leftalign {
  text-align: left;
}
.navigationIcon {
  background-color: #cc9900 !important;
  color: #FFF !important;
  font-size: 50px !important;
  border-radius: 100%;
  padding: 5px;
  cursor: pointer;
}
.navIndicator {
  background-color: #d9d9d9;
  border: 2px solid #777777;
  cursor: pointer;
}
.activewoopog {
  background-color: #777777;
}
`;