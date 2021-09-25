import { Card, CardHeader, CardContent, Grid, Typography, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

// stock images
import MedicalImage from "../static/doctor_teacher.jpg";
import CareersImage from "../static/career.jpg";



function Landing() {
	const history = useHistory();
	return (
		<>
			<Container>
				<Grid container spacing={8} justify="center">
					<Grid item xs={12} sm={6}>
						<Typography variant="h5">
							Hi, welcome to Curtin University's Medical Course Planner!
						</Typography>
					</Grid>
				</Grid>
				<br />
				<br />
				<br />
				<Typography variant="h5" className="classes.prompt">
					What would you like to do?
				</Typography>
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

				</Grid>
			</Container>
		</>
	);
}


export default Landing;
