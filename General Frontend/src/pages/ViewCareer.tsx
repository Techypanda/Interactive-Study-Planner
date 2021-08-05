import {Button} from "@material-ui-core";
import Navbar from "../components/shared/Navbar";
import { DefaultProps } from "../types";

function ViewCareer(props: DefaultProps) {
    return (
        <div>
          <Navbar/>
          <Typography variant="h2">
            {props.careerTitle}
          </Typography>
          <Typography variant="h6">
            {props.careerDescription}
          </Typography>
          <Button variant="contained">
            Back
          </Button>
        </div>
    )
}

export default ViewCareer;
