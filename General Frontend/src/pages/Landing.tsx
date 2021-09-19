import {  Card, CardHeader, CardMedia, CardContent, Grid, Paper, Typography } from "@material-ui/core";
import Navbar from "../components/shared/Navbar";
import styled from 'styled-components';
import {useHistory} from "react-router-dom";

// pages
import ViewAllCareers from "./ViewAllCareers";
import ViewAllUnits from "./ViewAllUnits";
import PlannerInitialPage from "./PlannerInitialPage";

// stock images
import MedicalImage from "../static/doctor_teacher.jpg";
import CareersImage from "../static/career.jpg";
import TraitsImage from "../static/traits_image.jpg";
import '../App.scss';



function Landing() {
    const history = useHistory();
    return(
	<>
	    <Navbar/>
	    <br/>
	    <br/>
	    <br/>
	    <Grid container spacing={8} justify="center">
		<Grid item xs={12} sm={6}>
		    <Typography variant="h5">
			Hi, welcome to Curtin University's Medical Course Planner!
		    </Typography>
		</Grid>
	    </Grid>
	    <br/>
	    <br/>
	    <br/>
	    <Typography variant="h5" className="classes.prompt">
		What would you like to do?
	    </Typography>
	    
	    {/* routed cards */}
	    <Grid container spacing={4} justify="center">
		<Grid item xs={12} sm={6}>
		    <div className="card-body">
			<Card variant="outlined" onClick = {() => history.push('./PlannerInitialPage') }> 
			    <CardHeader title="Plan Your Medical Course"/>
			    <Grid item>
				<img  src={MedicalImage} alt="medical stock image"/>
			    </Grid>
			    <CardContent>
				<Typography variant="body1" align="center">
				    See how Curtin's flexible course structure can be shaped to you advantage.
				</Typography> 
			    </CardContent>
			</Card>
		    </div>
		</Grid>

		<Grid item xs={12} sm={6}>
		    <div className="card-body">
			<Card variant="outlined"  onClick = {() => history.push('/ViewAllCareers')}>
			    <CardHeader title="See Careers"/>
			    <Grid item>
				<img src={CareersImage} alt="careers stock image"/>
			    </Grid>
			    <CardContent>
				<Typography variant="body1" align="center" >
				    See all the possible careers Curtin can lead to and their requirements.
				</Typography>
			    </CardContent>
			</Card>
		    </div>
		</Grid>

		<Grid item xs={12} sm={6} >
		    <div className="card-body">
			<Card variant="outlined"  onClick = {() => history.push('/ViewAllUnits')}>
			    <CardHeader title="See Classes"/>
			    <Grid item>
				<img src={TraitsImage} alt="careers stock image"/>
			    </Grid>
			    <CardContent>
				<Typography  variant="body1" align="center">
				    Discover all the courses that Curtin University offers in this program.
				</Typography>
			    </CardContent>
			</Card>
		    </div>
		</Grid>
	    </Grid>
	</>
    );
}


export default Landing;
