import {useHistory, Switch, Route} from "react-router-dom";
import ViewCareer from "../components/shared/ViewCareer";
import ViewMajor from "../components/shared/ViewMajor";
import ViewSpecialization from "../components/shared/ViewSpecialization";
import ViewUnit from "../components/shared/ViewUnit";

import { Fade, Button } from "@material-ui/core";

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 7/09/2021
 * Description: Routing page for information pages
 */
//Notes - remove button, test function, test route and usehistory after testing concluded or comment out

//Information page router
function InfoPageRouter()
{
    return(
        <Fade in={true} timeout={2000}>
            <Switch>
                <Route exact path="/InfoPage/Test">
                    <Test/>
                </Route>
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
        </Fade>  
    );
}

function Test()
{
    const history = useHistory();
    return (
        <div>
            <Button onClick={() => {
                history.push("/InfoPage/ViewSpecialization", "SPUC-ICBIO")
                //history.push("/InfoPage/ViewMajor", "MJRU-HUMBM")
                //history.push("/InfoPage/ViewCareer", "1xLja1wVTNUVxKVO1N6vnG51rJZ")
            }}>
                Test
            </Button>
        </div>
    )
}

export default InfoPageRouter;