import {Button, Typography} from "@material-ui/core";
import Navbar from "../components/shared/Navbar";
import { CareerProps, DataId } from "../types";
import axios, { AxiosError, AxiosResponse } from "axios";

// most likey used for top down, so user looks at careers, picks one (where though?) and a pre-planned plan is generated.
// Pretty much just a white page with a title, paragraphs and a back button, could really be
// with raw HTML tbh
function ViewCareer(props: DataId) {
  //Get career information from table
  const career : CareerProps = {
    careerName : "Hello",
    careerDescription : "ahfj",
    careerIndustry : "ahgiod",
    careerReqs : "dfiophjiah",
    careerTraits : "aghoifh"
  };

  return (
      <div>
        <Navbar/>
        <Typography variant="h2">
          {career.careerName}
        </Typography>
        <Typography variant="h4">Description</Typography>
        <Typography variant="h6">
          {career.careerDescription}
        </Typography>
        <Typography variant="h4">Industry</Typography>
        <Typography variant="h6">
          {career.careerDescription}
        </Typography>
        <Typography variant="h4">Requirements</Typography>
        <Typography variant="h6">
          {career.careerDescription}
        </Typography>
        <Typography variant="h4">Traits</Typography>
        <Typography variant="h6">
          {career.careerDescription}
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

export default ViewCareer;
