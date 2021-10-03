import { useEffect, useState } from 'react';
import { Box, Button, Container,Typography, Card, CardContent, TextField} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { DefaultProps } from "../types";
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import UnitsDataTable from "../components/shared/UnitsDatatable"

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
	    set_units_list(response.data);
	});
    }
    useEffect(() => {
	GetAllUnits();
    }, []);

    return (
	<>
		<br/>
	    <Container  >
			<UnitsDataTable items={units_list}/>
		</Container>
	    <br/>

	</>
    );
}

export default ViewAllUnits;
