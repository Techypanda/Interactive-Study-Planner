// first page that is seen when the general user opens the site, prompting a choice
// between top down and bottom up course planner buildilng.

import { Box, Grid, Typography, Card, CardActionArea, CardHeader, CardMedia, CardContent, Paper} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "../components/shared/Navbar";
import { DefaultProps } from "../types";
import ListCareers from "./ViewAllCareers";

import CareersImage from "../static/career.jpg";
import ClassesImage from "../static/classes.jpg";

function Landing(props: DefaultProps) {
    return (
        <div>
          <Navbar/>
          <Box id="landing" className={props.className} paddingTop={4}>
            <Grid container spacing={4} justify="center" alignItems="center">
              <Grid item xs={6}>
                <CardActionArea>
	          <Card> 
	            <CardHeader title="Careers"/>
	            <CardContent> {/* loading image through material ui card media doesn't work */}
                      <img src={CareersImage} alt="careers stock image"/>
	              <Typography variant="body1" align="left">
                        See what paths are available towards your dream career
                      </Typography>
	            </CardContent>
	          </Card>
                </CardActionArea>
              </Grid>

              <Grid item xs = {6}>
	        <Card>
                  <CardActionArea>
	            <CardHeader title="Courses"/>
	            <CardContent>
                      <img src={ClassesImage} alt="classroom stock photo"/>
		      
	              <Typography variant="body1" align="left">
                        Create a study plan of interesting units and see what opportunities this could lead to
                      </Typography>
        	    </CardContent>
                  </CardActionArea>
	        </Card>
              </Grid>
            </Grid>
          </Box>
        </div>
    );
}

const loadTopDown = () => {
    return (
        <>
          <ListCareers/>
        </>
    );
};

const loadBottomUp = () => {
    // load pages bottom up component
    console.log("selected bottom up option");
};

export default Landing;

