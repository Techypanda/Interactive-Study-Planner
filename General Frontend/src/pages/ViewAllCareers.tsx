import { useEffect, useState } from 'react';
import { Box, Button, Container,Typography, Card, CardContent, TextField} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { DefaultProps } from "../types";
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import CareersDatatable from "../components/shared/CareersDatatable"
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
	root: {
	    display: 'flex',
	},
	details: {
	    display: 'flex',
	    flexDirection: 'column',
	},
	content: {
	    flex: '1 0 auto',
	},
	cover: {
	    width: 151,
	},
	controls: {
	    display: 'flex',
	    alignItems: 'right',
	    paddingRight: theme.spacing(1),
	    paddingBottom: theme.spacing(1),
	},
	playIcon: {
	    height: 38,
	    width: 38,
	},
	
    }),
);

function ViewAllCareers(props: DefaultProps) {
    const history = useHistory();
    const classes = useStyles();

	const base = [{Description : "", Industry : "", CareerId: ""}]
	const [careersList, setCareersData] = useState(base);

	const getCareersData = () => {
		axios.get("https://q02l9qoni6.execute-api.ap-southeast-2.amazonaws.com/Prod/events/event-get-all-careers")
				.then((response) => {
					setCareersData(response.data);
				})
	}
	useEffect(() => {
		getCareersData();
	  }, []);

    return (
	<>
		<br/>
	    <Container  >
			<CareersDatatable items={careersList}/>
	    </Container>
	    <br/>
	</>
    );
}

export default ViewAllCareers;
