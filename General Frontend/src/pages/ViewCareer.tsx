import {Button, Typography} from "@material-ui/core";
import Navbar from "../components/shared/Navbar";
import { CareerProps } from "../types";

// most likey used for top down, so user looks at careers, picks one (where though?) and a pre-planned plan is generated.
// Pretty much just a white page with a title, paragraphs and a back button, could really be
// with raw HTML tbh
function ViewCareer(props: CareerProps) {
    return (
        <div>
          <Navbar/>
          <Typography variant="h2">
            {props.careerName}
          </Typography>
          <Typography variant="h6">
            {props.careerDescription}
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
