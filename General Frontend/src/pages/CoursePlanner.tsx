import EmptyCurrentPlan from "../components/shared/EmptyCurrentPlan";
import LoadingScreen from "../components/shared/Loading";
import Navbar from "../components/shared/Navbar";
import { DefaultProps } from "../types";
import Error from "../components/shared/Error";
import { Typography, List, ListItem, ListItemText, Grid } from "@material-ui/core";
import { useQuery, useMutation } from "react-query";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { UnitProps } from '../types';
import { makeStyles } from '@material-ui/core/styles';
import axios, { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

// https://www.youtube.com/watch?v=YONLLb7_31E -> source for the basics of how react-beautiful-dnd works

const useStyles = makeStyles((theme) => ({ 
    root: { 
        width: '100%',
        maxWidth: 360,
    },
    nonNavBar: {
        'height': '90vh',
        outline: '1px solid #d9b362'
    },
    test: { 
        'margin-top': 50
    }
}))

// differentiate drag and drop zones as they are functionally identical sans side-effects
// i.e. prerequisite based filtering on drop.
const dnd_lists: String[] = ["Plan So Far", "Available Units"];


function CoursePlanner() {

    const classes = useStyles();
    const history = useHistory();

    const [units_list, set_units_list] = useState(null);

    const [isError, setError ] = useState(false);
    const [error, setErrorContent] = useState<string>();

    
    // updated as units are selected so that available units can be filtered out
    const [prerequisites_list, set_prerequisites_list] = useState(" ");

    const GetAllUnits = () => {
	try {
	    axios.get("https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getallunits")
		.then((response) => {
		    console.log(response.data);
		    set_units_list(response.data);
		 });
	} catch (err) {
	    if (err && err.response && axios.isAxiosError(err)) {
		const axios_resp = err.response as AxiosResponse;
		setErrorContent(axios_resp.data);
		setError(true);
	    } else {
		setErrorContent("Unknown error occurred attempting to retrieve units.");
		setError(true);
	    }
	}
    };

    useEffect(() => {
	GetAllUnits();
    }, []);

    if (isError) {
	return <Error promptTitle="Request Error" promptContent={error as string} showPrompt={true} onAccept={() => history.goBack()} />
    }
    
    return (
	<>
	    <Navbar/>
	    <Typography variant="h4" align="left">
		{prerequisites_list}
	    </Typography>
	    
	    <DragDropContext
		onDragUpdate={OnDragUpdate}
		onDragEnd={OnDragEnd}>
		<Grid container justifyContent={'space-between'} alignItems={'stretch'} className={classes.nonNavBar}>
		    <Grid item xs={2}>
			<EmptyCurrentPlan/> {/* placeholder */}
		    </Grid>
		    <Grid item xs={8} className={classes.test}>
			<div>


			</div>
		    </Grid>
		    <Grid item xs={2}>
			<AvailableUnitsDisplay units_list={units_list}/>
		    </Grid>

		</Grid>

	    </DragDropContext>
	</>
    );
}

// actual front end component for draggable representation of units
function UnitDraggableItem() {

}

// scrollable list to the right of the screen, dynamically shows available courses
// as pre-reqs and anti-reqs are made, rendering and unrendering as necessary.
function AvailableUnitsDisplay({units_list} : {units_list: any}) {
    const classes = useStyles();
    return (
	<Typography>hey</Typography>
    );
}

// displays selected courses drag and dropped
// divided into semesters
function SelectionArea() {
    return (
	<Droppable droppableId="droppable">
	    {(provided, snapshot) =>(
		<div
		    {...provided.droppableProps}
		    ref={provided.innerRef}>


		    {provided.placeholder}
		    
		</div>
	    )}

	</Droppable> 
    )
}

// every function below here is a placeholder until the prerequisite filtering is figured out

function RemoveFromList(list: any, index: number) {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
}

function AddToList(list: any, index: number, element: any) {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
}


function OnDragUpdate() {
    
}

function OnDragEnd(result: DropResult) {
    if (!result.destination) return;

    // typical boiler plate for react-beautiful-dnd won't work since item reordering and
    // such doesn't fit our needs due to smeester based formatting
    // better learn hooks better :/

    // requirements: update state like anything else but somehow also update prerequisite hook
    // how to access this, I do not know
    
    return;
}

function CheckAntiRequisites(antirequisites: string[]) {
    // if any of the param's elements are present in the current prerequisite pool or selection pool, return false
}

function CheckPrerequisites(prerequisites: string[]) {
    // entire prereq array must be present within prerequisite state hook storage
}

function CheckCorequisites(corequisites: string[]) {
    
}

export default CoursePlanner;
