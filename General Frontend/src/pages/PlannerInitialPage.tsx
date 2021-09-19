// first page that is seen when the general user opens the site, prompting a choice
// between top down and bottom up course planner buildilng.

import { Box, Grid, Typography, Card, CardActions, CardActionArea, CardHeader, CardMedia, CardContent, Paper, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import { DefaultProps } from "../types";

import ListCareers from "./ViewAllCareers";
import CoursePlanner from "./CoursePlanner";
import TopdownInitial from "./TopdownInitial";
import CareersImage from "../static/career.jpg";
import ClassesImage from "../static/classes.jpg";

import '../App.scss';

function PlannerInitialPage(props: DefaultProps) {
	const history = useHistory();
	return (
		<>
	    <Navbar/>
		<br>
		</br>
		<div style={{float:'left'}}>
			<Button className="backButton" variant="contained" onClick={() => history.goBack()} >
				Back
			</Button>
		</div>
	    <Typography variant="h5" className="classes.prompt">
			What would you like to do?
	    </Typography>
	    <br>
		</br>
		<br>
		</br>
		<br>
		</br>
		<br>
		</br>
		<br>
		</br>
		<br>
		</br>


	    {/* routed cards */}
	    <Grid container spacing={4} justify="center">
			<Grid item xs={12} sm={6}>
				<div className="card-body">
				<Card variant="outlined" onClick = {() => history.push('/CoursePlanner') }> 
					<CardHeader title="Plan Your Medical Course"/>
					<Grid item>
						<img  src={ClassesImage} alt="medical stock image"/>
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
				<Card variant="outlined"  onClick = {() => history.push('/TopdownInitial')}>
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
	    </Grid>
	</>
	);
}

export default PlannerInitialPage;

