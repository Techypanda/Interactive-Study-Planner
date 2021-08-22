import { AppBar, Card, CardActionArea, CardHeader, CardMedia, CardContent, Grid, Paper, Typography } from "@material-ui/core";
import Navbar from "../components/shared/Navbar";
import styled from 'styled-components';
import {useHistory} from "react-router-dom";

// pages
import ViewAllCareers from "./ViewAllCareers";

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
		<Grid item xs={5}>
		    <Typography variant="h5">
			Hi, welcome to Curtin University's Medical Course Planner!
		    </Typography>
		</Grid>
		<Grid item xs={5}>
		    <Paper>
			<Typography variant="h6" align="left">
			    "Witty phrase misattributed to ghandi or something idc" - Joe Biden
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
		    <div className="card-body">
			<Card variant="outlined" > 
			    <CardHeader title="Plan Your Medical Course"/>
			    <CardContent>
				{/* <img src={MedicalImage} alt="medical stock image"/> */}
				<Typography variant="body1" align="left">
				    See how Curtin's flexible course structure can be shaped to you advantage.
				</Typography> 
			    </CardContent>
			</Card>
		    </div>
		</Grid>

		<Grid item xs={4}>
		    <div className="card-body">
			<Card variant="outlined"  onClick = {() => history.push('/ViewAllCareers')}>

			    <CardHeader title="See Careers"/>
			    <CardContent>
				{/* <img src={CareersImage} alt="careers stock image"/> */}
				<Typography variant="body1" align="left">
				    See all the possible careers Curtin can lead to and their requirements.
				</Typography>
			    </CardContent>
			</Card>
		    </div>
		</Grid>

		<Grid item xs={4}>
		    <div className="card-body">
			<Card variant="outlined">
			    <CardHeader title="What Career Path Suits Me?"/>
			    <CardContent>
				{/* <img src={TraitsImage} alt="personality stock image"/> */}
				<Typography  variant="body1" align="left">
				    Find out what type of career is most suitable for your personality.
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
