import {BrowserRouter, Switch, Route} from "react-router-dom";
import { DefaultProps } from "../types";
import ViewCareer from "../components/shared/ViewCareer";
import ViewMajor from "../components/shared/ViewMajor";

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 25/08/2021
 * Description: Routing page for information pages
 */
//Information page router
function InfoPageRouter()
{
    return(
        <Switch>
            <Route exact path="/InfoPage/ViewCareer">
                <ViewCareer/>
            </Route>
            <Route exact path="/InfoPage/ViewMajor">
                <ViewMajor/>
            </Route>
            <Route exact path="/InfoPage/ViewSpecialization">
                <ViewSpecialization/>
            </Route>
            <Route exact path="/InfoPage/ViewUnit">
                <ViewUnit/>
            </Route>
        </Switch>
    );
}

export default InfoPageRouter;