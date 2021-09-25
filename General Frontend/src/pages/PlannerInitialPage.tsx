/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @typescript-eslint/no-unused-vars */
// first page that is seen when the general user opens the site, prompting a choice
// between top down and bottom up course planner buildilng.

import { Box, Grid, Typography, Card, CardActions, CardActionArea, CardHeader, CardMedia, CardContent, Paper, Button, Container, useMediaQuery } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { DefaultProps } from "../types";

import ListCareers from "./ViewAllCareers";
import CoursePlanner from "./CoursePlanner";
import TopdownInitial from "./TopdownInitial";
import CareersImage from "../static/career.jpg";
import ClassesImage from "../static/classes.jpg";
import CardPrompt from "../components/Landing/CardPrompt";

function PlannerInitialPage(props: DefaultProps) {
	const history = useHistory();
	const isTablet = useMediaQuery('(max-width: 800px)');
	return (
		<Container>
			{/* <div style={{ float: 'left' }}>
				<Button className="backButton" variant="contained" onClick={() => history.goBack()} >
					Back
				</Button>
			</div> */
			/* I dont think we need a back button they can just press the browser back button, looks weird */
			}

			<Box mb={isTablet ? 3 : 10} mt={4}>
				<Typography variant="h5" component="h2">
					How would you like to plan your course?
				</Typography>
			</Box>
			<Grid container>
				<Grid item md={6} xs={12}>
					<Box mb={isTablet ? 2 : 0}>
						<CardPrompt
							onClick={() => history.push('/CoursePlanner')}
							src={ClassesImage}
							alt="A image of curtin university"
							title={"Units First Approach"}
							description={"Pick the units you are intersted in and at the end be told what career you can get out of all the units you have selected"}
						/>
					</Box>
				</Grid>
				<Grid item md={6} xs={12}>
					<Box mb={isTablet ? 2 : 0}>
						<CardPrompt
							onClick={() => history.push('/TopdownInitial')}
							src={CareersImage} // replace this image asap
							alt="A Stock Image Declaring Keywords Around Dream Jobs"
							title={"Careers First Approach"}
							description={"Pick your dream career and be told what units you need to take in order to achieve that career, then you can add and remove units from the workload"}
						/>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
}

export default PlannerInitialPage;

