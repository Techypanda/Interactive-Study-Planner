import {	Grid, Typography, Container, Box, useMediaQuery } from "@material-ui/core";
import { useHistory } from "react-router-dom";

// stock images
import MedicalImage from "../static/doctor_teacher.jpg";
import CareersImage from "../static/career.jpg";
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
				<Grid container>
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
				</Grid>

				{/* <Grid container spacing={4} justify="center">
					<Grid item xs={12} sm={6}>
						<div className="card-body">
							<Card variant="outlined" onClick={() => history.push('./PlannerInitialPage')}>
								<CardHeader title="Plan Your Medical Course" />
								<Grid item>
									<img src={MedicalImage} alt="medical stock image" />
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
							<Card variant="outlined" onClick={() => history.push('/ViewAllCareers')}>
								<CardHeader title="See Careers" />
								<Grid item>
									<img src={CareersImage} alt="careers stock image" />
								</Grid>
								<CardContent>
									<Typography variant="body1" align="center" >
										See all the possible careers Curtin can lead to and their requirements.
									</Typography>
								</CardContent>
							</Card>
						</div>
					</Grid>
				</Grid> */}
			</Container>
		</>
	);
}


export default Landing;
