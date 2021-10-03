import { useEffect, useState } from 'react';
import { Box, Button, Container,Typography, Card, CardContent, TextField} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { DefaultProps } from "../types";
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';

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

function ViewAllUnits(props: DefaultProps) {
    const history = useHistory();
    const classes = useStyles();

    const base = [{Credits: "", Antirequisites: "", Prerequisites: "", Delivery: "", UnitCode: "", Description: "", Corequisites: "", Name: ""}];
    const [units_list, set_units_list] = useState(base);

    const GetAllUnits = () => {
	axios.get("https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getallunits/")
	.then((response) => {
	    act(set_units_list(response.data));
	});
    }
    useEffect(() => {
	GetAllUnits();
    }, []);

    return (
	<>
		<br>
		</br>
	    <Container  >
		<Box id="searchcontainer" display="flex">
			<Button className="backButton" variant="contained" onClick={() => history.goBack()} >
				Back
			</Button>
		    <TextField style={{padding: '0 10px'}} variant="outlined" id="standard-full-width" fullWidth  placeholder="Search careers..." className="searchbar" />
			<Button variant='contained' className="searchbtn">Search</Button>
		</Box>
		<br/>
		{units_list.map((x) => (
		    <div className="unit-option">
			<Card variant="outlined" className={classes.root}>
			    <div className={classes.details}>
				<CardContent onClick={() => history.push(`/InfoPage/ViewUnit/${x.UnitCode}`)} className={classes.content}>
				    <Typography className='values' component="h5" variant="h5" align="left">
					{x.Name}
				    </Typography>
				    <Typography variant="subtitle1" color="textSecondary">
					{x.Description}
				    </Typography>
				</CardContent>
				<div className={classes.controls}>
				</div>
			    </div>
			</Card>
		    </div>
		    ))}
			<br>
			</br>
			<Button variant="contained" onClick={() => history.goBack()}>Back</Button>
			<br>
			</br>
		</Container>
	    <br/>

	</>
    );
}

export default ViewAllUnits;
