import {	Grid, Typography, Container, Box, useMediaQuery } from "@material-ui/core";
import { useHistory } from "react-router-dom";

// stock images
import MedicalImage from "../static/doctor_teacher.jpg";
import CareersImage from "../static/career.jpg";
import TraitsImage from "../static/traits_image.jpg"
import CardPrompt from "../components/Landing/CardPrompt";



function Landing() {
	const history = useHistory();
	const isTablet = useMediaQuery('(max-width: 800px)');
	return (
		<>
			<Container>
				<Box mt={4.5} mb={2}>
					<Typography variant="h5" component="h2">
						Hi, Welcome to Curtin University's Medical Course Planner
					</Typography>
				</Box>
				<Box mb={isTablet ? 3 : 10}>
					<Typography variant="subtitle1" component="h3" className="classes.prompt">
						What Would You Like To Do?
					</Typography>
				</Box>
				<Grid container spacing={2} justify="center">
					<Grid item md={6} xs={12}>
						<Box mb={isTablet ? 2 : 0}>
							<CardPrompt
								onClick={() => history.push('./PlannerInitialPage')}
								src={MedicalImage}
								alt="A Doctor Pointing At A Whiteboard"
								title={"Plan My Medical Course"}
								description={"See how Curtin's flexible course structure can be shaped to you advantage."}
							/>
						</Box>
					</Grid>
					<Grid item md={6} xs={12}>
						<Box mb={isTablet ? 2 : 0}>
							<CardPrompt
								onClick={() => history.push('/ViewAllCareers')}
								src={CareersImage}
								alt="A Stock Image Declaring Keywords Around Dream Jobs"
								title={"See Available Careers"}
								description={"See all the possible careers Curtin can lead to and their requirements."}
							/>
						</Box>
					</Grid>
					<Grid item md={6} xs={12}>
						<Box mb={isTablet ? 2 : 0}>
							<CardPrompt
								onClick={() => history.push('/ViewAllUnits')}
								src={TraitsImage}
								alt="A Stock Image Declaring Units"
								title={"See Available Units"}
								description={"Discover all the courses that Curtin University offers in this program."}
							/>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}


export default Landing;
