import { AppBar, Box, Card, CardActions, CardActionArea, CardHeader, CardMedia, CardContent, Grid, Toolbar, Typography } from "@material-ui/core";
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
	    <Grid container spacing={8}>
		<Grid item xs={6}>
		    <Typography>
			Hi, welcome to Curtin University's Medical Course Planner
		    </Typography>
		</Grid>
		<Grid item xs={6}>
		    <Typography>
			"Witty phrase misattributed to ghandi or something idc"
		    </Typography>
		</Grid>
	    </Grid>
	    <Typography>
		What would you like to do?
	    </Typography>
	    <Grid container spacing={4}>
		
		<Grid item xs={6}>
		    <CardActionArea component={Link} to='/PlannerInitialPage'>
			<Card variant="outlined">
			    <CardHeader tite="Plan Your Medical Course"/>
			    <CardContent>
				<img src={MedicalImage} alt="medical stock image"/>
				<Typography variant="body1" align="left">
				    See how Curtin's flexible course structure can be shaped to you advantage.
				</Typography> 
			    </CardContent>
			</Card>
		    </CardActionArea>
		</Grid>

		<Grid item xs={6}>
		    <CardActionArea component={Link} to='/ListCareers'>
			<Card variant="outlined">
			    <CardHeader title="See Careers"/>
			    <CardContent>
				<img src={CareersImage} alt="careers stock image"/>
				<Typography variant="body1" align="left">
				    See all the possible careers Curtin can lead to and their requirements.
				</Typography>
			    </CardContent>
			</Card>
		    </CardActionArea>
		</Grid>

		<Grid item xs={6}>
		    <CardActionArea> {/* traits page not made yet */}
			<Card variant="outlined">
			    <CardHeader title="What Career Path Suits Me?"/>
			    <CardContent>
				<img src={TraitsImage} alt="personality stock image"/>
				<Typography  variant="body1" align="left">
				    Find out what type of career suits your personality the best.
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
