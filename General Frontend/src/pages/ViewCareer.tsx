import {Button, Typography} from "@material-ui/core";
import Navbar from "../components/shared/Navbar";
import { CareerProps } from "../types";

function ViewCareer(props: CareerProps) {
    return (
        <div>
          <Navbar/>
          <Typography variant="h2">
            {props.careerTitle}
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
