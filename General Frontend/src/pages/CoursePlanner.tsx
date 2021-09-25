import EmptyCurrentPlan from "../components/shared/EmptyCurrentPlan";
import LoadingScreen from "../components/shared/Loading";
import PlansAvailable from "../components/shared/PlansAvailable";
import { DefaultProps } from "../types";
import Error from "../components/shared/Error";
import { Typography, List, ListItem, ListItemText, ListItemSecondaryAction, ListSubheader, Grid } from "@material-ui/core";
import BookOutlined from '@material-ui/icons/BookOutlined';
import IconButton from '@material-ui/core/IconButton';
import { useQuery, useMutation } from "react-query";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
/* import { UnitProps } from '../types'; */
import { makeStyles } from '@material-ui/core/styles';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

// https://www.youtube.com/watch?v=YONLLb7_31E -> source for the basics of how react-beautiful-dnd works
// TODO: move some components into the components/shared directory for Max to collaborate with and keep this file
// mostly for bottom up logic and behavioural correctness checks
// TODO: remove all instances of 'any' and replace with useful type information
const useStyles = makeStyles((theme) => ({ 
    root: { 
	width: '100%',
	maxWidth: 360,
	outline: '1px solid #d9b362',
	backgroundColor: theme.palette.background.paper,
	height: '100%',
    },
    nonNavBar: {
        'height': '90vh',
        outline: '1px solid #d9b362'
    },
    test: { 
        'margin-top': 50
    },
    listHeader: {
	//'text-align': 'center',
	color: 'black',
    },
    capitalize: {
	textTransform: "uppercase",
    },
}))

// differentiate drag and drop zones as they are functionally identical sans side-effects
// i.e. prerequisite based filtering on drop.
const dnd_lists: String[] = ["Plan So Far", "Available Units"];

function CoursePlanner() {

    const classes = useStyles();
    const history = useHistory();

    const base = [{Credits: "", Antirequisites: "", Prerequisites: "", Delivery: "", UnitCode: "", Description: "", Corequisites: "", Name: ""}];
    const [units_list, set_units_list] = useState(base);

    const [isError, setError ] = useState(false);
    const [error, setErrorContent] = useState<string>();

    
    // updated as units are selected so that available units can be filtered out
    const [prereqs_list, set_prereqs_list] = useState();

    const GetAllUnits = () => {
	try {
	    axios.get("https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getallunits")
		 .then((response) => {
		     console.log(response.data);
		     set_units_list(response.data);
		 });
	} catch (err: any) {
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
	    <DragDropContext
		onDragUpdate={OnDragUpdate}
		onDragEnd={OnDragEnd}>
		<Grid container justifyContent={'space-between'} alignItems={'stretch'} className={classes.nonNavBar}>
		    <Grid item xs={2}>
			<EmptyCurrentPlan/> {/* placeholder */}
		    </Grid>
		    <Grid item xs={8} className={classes.test}>
			<div>
			    <PlansAvailable/> {/* placeholder */}
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
// used by both lists
// perhaps this isn't necessary? the units load in the right list after quite a delay
function UnitListItem({unit} : {unit: any}) {
    const classes = useStyles()
    return (
	<ListItem role={undefined}>
	    <ListItemText primary={unit.Name} className={classes.capitalize} />
	    <ListItemSecondaryAction>
		<IconButton edge="end" aria-label="comments">
		    <BookOutlined/>
		</IconButton>
	    </ListItemSecondaryAction>
	</ListItem>
    );
}

/* function UnitDraggableItem({}) {
 *     return (
 * 	<>
 * 	    <Droppable >
 * 		{(provided) => (
 * 		    <div {...provided.droppableProps} ref={provided.innerRef}>
 * 		    
 * 		)}
 * 
 * 	    </Droppable>
 * 	</>
 *     )
 * } */

// scrollable list to the right of the screen, dynamically shows available courses
// as pre-reqs and anti-reqs are made, rendering and unrendering as necessary.
function AvailableUnitsDisplay({units_list} : {units_list : any}) {
    const classes = useStyles();
    return (
	<>
	    <List subheader =
		  {<ListSubheader className={classes.listHeader }>
		      <Typography variant='h5'>
			  Available Units
		      </Typography>
		  </ListSubheader>} className={classes.root}>
		{units_list.map((value: any) => {
		    return (
			<UnitListItem unit={value}/>
		    )
		})}
	    </List>
	</>
    )
}

// displays selected courses drag and dropped
// divided into semesters
function SelectedUnitsDisplay() {
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

// trigger re-shuffling of any list
// OnDragStart is not necessary
function OnDragEnd(result: DropResult) {
    /* const {source, destination} = result;
     * if (!destination) return;

     * const items = Array.from()
     * const [new_order] = 
     * return; */
}

function OnDragUpdate(result: DropResult) {
    
}

// the following two functions take in the droppable lists and reorder them as an item is taken or inserted
// they are called by both list components through their onDragEnd properties.
// As those calls are implemented by the previous two functions there is no need to call these two directly
// these are necessary with more than one droppable list
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

export default CoursePlanner;