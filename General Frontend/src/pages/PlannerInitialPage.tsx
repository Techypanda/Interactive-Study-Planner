// first page that is seen when the general user opens the site, prompting a choice
// between top down and bottom up course planner buildilng.

import { Box, Grid, Typography, Card, CardHeader, CardMedia, CardContent} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import { DefaultProps } from "../types";

import ListCareers from "./ViewAllCareers";

import CareersImage from "../static/career.jpg";
import ClassesImage from "../static/classes.jpg";

import '../App.scss';

function PlannerInitialPage(props: DefaultProps) {
    const history = useHistory();
    return (
	<>
	    <Navbar/>
	    <Box id="landing" className={props.className} paddingTop={4}>

		{/* top down component */}
		<Grid container spacing={4} justify="center" alignItems="center">
		    <Grid item xs={6}>
			<div className="card-body">
			    <Card variant="outlined"> 
				<CardHeader title="Careers"/>
				<CardContent> 
				    <img src={CareersImage}/>
				    <Typography variant="body1" align="left">
					See what paths are available towards your dream career
				    </Typography>
				</CardContent>
			    </Card>
			</div>
		    </Grid>

		    {/* bottom up component */}
		    <Grid item xs = {6}>
			<div className="card-body">
			    <Card variant="outlined" onClick={() => history.push('/CoursePlanner')}>
				<CardHeader title="Courses"/>
				<CardContent>
				    <img src={ClassesImage} />
				    
				    <Typography variant="body1" align="left">
					Create a study plan of interesting units and see what opportunities this could lead to
				    </Typography>
				</CardContent>
			    </Card>
			</div>
		    </Grid>
		</Grid>
	    </Box>
	</>
    );
}

export default PlannerInitialPage;

