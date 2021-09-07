import Navbar from "../components/shared/Navbar";
import {DefaultProps} from "../types";
import {Typography} from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// POC of class selection into an organised plan separated by semester, assuming full time study.
// Prerequisites, co-requisites and antirequisites TBD, as well as semester availability

// dummy classes with just names and codes
let unit_list: {UnitName: string, UnitCode: string}[] = [
    {UnitName: "Distributed Computing", UnitCode: "COMP3006"},
    {UnitName: "Artificial and Machine Intelligence", UnitCode: "COMP3001"},
    {UnitName: "Human Computer Interface", UnitCode: "ISAD3001"},
    {UnitName: "Capstone Computing Project", UnitCode: "ISAD3000"},
    {UnitName: "Computer Graphics", UnitCode: "COMP2006"},
    {UnitName: "Programming Design and Implementation", UnitCode: "COMP1001"},
    {UnitName: "Unix and C Programming", UnitCode: "COMP2003"}
];

// renders the other components
// is this how you're meant to use React? Who knows
function CoursePlanner() {

    return (
	<>
	    <Navbar/>

	</>
    );
}

// scrollable list to the right of the screen, dynamically shows available courses
// as pre-reqs and anti-reqs are made, rendering and unrendering as necessary.
function CourseDisplay() {
    
}

// displays selected courses drag and dropped
// divided into semesters
function SelectionArea() {
    
}

export default CoursePlanner;
