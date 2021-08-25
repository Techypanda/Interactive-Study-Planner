import {Button, Typography} from "@material-ui/core";
import Navbar from "./Navbar";
import { MajorProps, DataIdProps } from "../../types";
import axios, { AxiosError, AxiosResponse } from "axios";

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 25/08/2021
 * Description: Page for viewing the detailed information on a major
 */

function ViewMajor(props: DataIdProps) {
  //Get major information from table
  const major : MajorProps = {
    majorCode : "Hello",
    majorName: "haoghoehg",
    majorDescription : "ahfj",
    majorCredits: 200,
    majorUnits : ["ahgiod"],
    majorAntiReqs : ["ajghoaeh"],
  };

  return (
      <div>
        <Typography variant="h2">
          {major.majorCode} - {major.majorName}
        </Typography>
        <Typography variant="h4">Description</Typography>
        <Typography variant="h6">
          {major.majorDescription}
        </Typography>
        <Typography variant="h4">Credits</Typography>
        <Typography variant="h6">
          {major.majorCredits}
        </Typography>
        <Typography variant="h4">Requirements</Typography>
        <Typography variant="h6">
          {major.majorDescription}
        </Typography>
        <Typography variant="h4">Traits</Typography>
        <Typography variant="h6">
          {major.majorDescription}
        </Typography>
        {/* why is material ui so inflexible and gross */}
        <Button variant="contained" style={{
            backgroundColor: "#FFBF00",
        }}>
          Back
        </Button>
      </div>
  );
}

export default ViewMajor;
