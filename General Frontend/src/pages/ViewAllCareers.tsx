// careers display with a search. Somehow this links to the course selection thingy
// don't call this yet it's not even close to done
import { BrowserRouter as Router } from "react-router-dom";
import { Box, Button, Grid, Typography, Card, CardActionArea, CardHeader, CardMedia, CardContent, TextField} from "@material-ui/core";
import Navbar from "../components/shared/Navbar";
import { useHistory } from 'react-router-dom';
import Error from "../components/shared/Error";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import {CareerProps} from "../types";

const Careers: CareerProps[] = [];



// called on loading of this component
// makes call to the careers API to get all careers so they can be rendered
function ListCareers() {
    return (
        <>
          <Navbar/>
          <ul className="Careers">
            // list of careers that must be retrieved from the database and displayed immedediately.
            // list is then conditionally rendered with 'map' based on search result's titles.
            // dummy data for now but we have to load the component using the info retrieved from
            // the database rather than just writing the page with HTML since that can't be done by
            // non-programmer maintainers. Dynamically loading a nice page with images is off the
            // table since the database doesn't return anything like that. Display retrieved
            // data and maybe link to the handbook

            
          </ul>
        </>
    );
}

// const CareerCard: CareerProps = () => {
//     return (
        
//     );
// }

export default ListCareers;
