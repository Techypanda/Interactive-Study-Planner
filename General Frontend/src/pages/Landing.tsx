// first page that is seen when the general user opens the site, prompting a choice
// between top down and bottom up course planner buildilng.

import { Box, Grid, Typography, Card, CardActionArea, CardHeader, CardMedia, CardContent} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "../components/shared/Navbar";
import { DefaultProps } from "../types";

function Landing(props: DefaultProps) {
    return (
        <div>
          <Navbar/>
          <Box id="landing" className={props.className} paddingTop={4}>
            <Typography variant="h4" align="left"> Medical Course Planner </Typography>
            <Grid container spacing={4} justify="center" alignItems="center">
              
              <Grid item xs={6}>
	        <Card onClick={() => {loadTopDown();}}>
	            <CardHeader title="Careers"/>
	            <CardContent>
	              <Typography variant="body1" align="left">
                        See what paths are available towards your dream career
                      </Typography>
	            </CardContent>
	        </Card>
              </Grid>
              
              <Grid item xs = {6}>
	        <Card onClick={() => {loadBottomUp();}}>
	            <CardHeader title="Courses"/>
	            <CardContent>
	              <Typography variant="body1" align="left">
                        Create a study plan of interesting units and see what opportunities this could lead to!
                      </Typography>
	            </CardContent>
	        </Card>
              </Grid>

            </Grid>
          </Box>
        </div>
    );
}

const loadTopDown = () => {
    // load pages top down component
    console.log("Selected top down option");
};

const loadBottomUp = () => {
    // load pages bottom up component
    console.log("selected bottom up option");
};

export default Landing;

