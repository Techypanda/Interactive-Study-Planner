import {Button, Typography} from "@material-ui/core";
import Navbar from "../components/shared/Navbar";
import { MajorProps, DataId } from "../types";
import axios, { AxiosError, AxiosResponse } from "axios";

// most likey used for top down, so user looks at majors, picks one (where though?) and a pre-planned plan is generated.
// Pretty much just a white page with a title, paragraphs and a back button, could really be
// with raw HTML tbh
function ViewMajor(props: DataId) {
  //Get major information from table
  const major : MajorProps = {
    majorCode : "Hello",
    majorName: "haoghoehg",
    majorDescription : "ahfj",
    majorUnits : "ahgiod",
    majorPreReqs : "dfiophjiah",
    majorCoReqs : "ajghoaeh",
    majorAntiReqs : "aghoifh"
  };

  return (
      <div>
        <Navbar/>
        <Typography variant="h2">
          {major.majorCode} - {major.majorName}
        </Typography>
        <Typography variant="h4">Description</Typography>
        <Typography variant="h6">
          {major.majorDescription}
        </Typography>
        <Typography variant="h4">Industry</Typography>
        <Typography variant="h6">
          {major.majorDescription}
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
