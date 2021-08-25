import {BrowserRouter, Switch, Route} from "react-router-dom";
import { DefaultProps } from "../types";
import ViewCareer from "../components/shared/ViewCareer";


function InfoPageRouter()
{
    return(
        <Switch>
            <Route exact path="/InfoPage/ViewCareer">
                <ViewCareer id="TESTDONTDELETE"/>
            </Route>
            <Route exact path="/InfoPage/ViewMajor">
                <ViewCareer id="TESTDONTDELETE"/>
            </Route>
            <Route exact path="/InfoPage/ViewSpecialization">
                <ViewCareer id="TESTDONTDELETE"/>
            </Route>
            <Route exact path="/InfoPage/ViewUnit">
                <ViewCareer id="TESTDONTDELETE"/>
            </Route>
        </Switch>
    );
}

export default InfoPageRouter;