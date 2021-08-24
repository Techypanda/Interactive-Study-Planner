// first page that is seen when the general user opens the site, prompting a choice
// between top down and bottom up course planner buildilng.

import { Link } from "react-router-dom";
import { Box, Grid, Typography, Card, CardActions, CardActionArea, CardHeader, CardMedia, CardContent, Paper} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "../components/shared/Navbar";
import { DefaultProps } from "../types";
import ListCareers from "./ViewAllCareers";

import CareersImage from "../static/career.jpg";
import ClassesImage from "../static/classes.jpg";

function PlannerInitialPage(props: DefaultProps) {
return (
<>
  <Navbar/>
  <Box id="landing" className={props.className} paddingTop={4}>
    <Grid container spacing={4} justify="center" alignItems="center">
      <Grid item xs={6}>
	  {/* this points to the wrong place, fix in a minute */}
        <CardActionArea component={Link} to='/ListCareers'>
	  <Card variant="outlined"> 
	    <CardHeader title="Careers"/>
	    <CardContent> {/* loading image through material ui card media doesn't seem to work */}
              <img src={CareersImage} alt="careers stock image"/>
	      <Typography variant="body1" align="left">
                See what paths are available towards your dream career
              </Typography>
	    </CardContent>
	  </Card>
        </CardActionArea>
      </Grid>

      <Grid item xs = {6}>
	<Card variant="outlined">
          <CardActionArea component={Link} to='CoursePlanner'>
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
</>
);
}

export default PlannerInitialPage;

