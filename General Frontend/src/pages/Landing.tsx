import { AppBar, Box, Card, CardActions, CardActionArea, CardHeader, CardMedia, CardContent, Grid, Paper,Toolbar, Typography } from "@material-ui/core";
import Navbar from "../components/shared/Navbar";
import styled from 'styled-components';
import {BrowserRouter as Router, Link} from "react-router-dom";

import MedicalImage from "../static/doctor_teacher.jpg";
import CareersImage from "../static/career.jpg";
import TraitsImage from "../static/traits_image.jpg";

function Landing() {
    return(
	<>
	    <Router>
		<Navbar/>
		<br/>
		<br/>
		<br/>
		<Grid container spacing={8} justify="center">
		    <Grid item xs={5}>
			<Typography variant="h5">
			    Hi, welcome to Curtin University's Medical Course Planner!
			</Typography>
		    </Grid>
		    <Grid item xs={5}>
			<Paper>
			    <Typography variant="h6">
				"Witty phrase misattributed to ghandi or something idc"
			    </Typography>
			</Paper>
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
		    <Grid item xs={4}>
			<CardActionArea component={Link} to='/PlannerInitialPage'>
			    <Card variant="outlined">
				<CardHeader title="Plan Your Medical Course"/>
				<CardContent>
				    {/* <img src={MedicalImage} alt="medical stock image"/> */}
				    <Typography variant="body1" align="left">
					See how Curtin's flexible course structure can be shaped to you advantage.
				    </Typography> 
				</CardContent>
			    </Card>
			</CardActionArea>
		    </Grid>

		    <Grid item xs={4}>
			<CardActionArea component={Link} to='/ListCareers'>
			    <Card variant="outlined">
				<CardHeader title="See Careers"/>
				<CardContent>
				    {/* <img src={CareersImage} alt="careers stock image"/> */}
				    <Typography variant="body1" align="left">
					See all the possible careers Curtin can lead to and their requirements.
				    </Typography>
				</CardContent>
			    </Card>
			</CardActionArea>
		    </Grid>

		    <Grid item xs={4}>
			<CardActionArea> {/* traits page not made yet */}
			    <Card variant="outlined">
				<CardHeader title="What Career Path Suits Me?"/>
				<CardContent>
				    {/* <img src={TraitsImage} alt="personality stock image"/> */}
				    <Typography  variant="body1" align="left">
					Find out what type of career suits your personality best.
				    </Typography>
				</CardContent>
			    </Card>
			</CardActionArea>
		    </Grid>
		</Grid>
	    </Router>
	</>
    );
}

export default Landing;
