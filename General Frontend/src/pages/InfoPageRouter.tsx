import { useHistory, Switch, Route } from "react-router-dom";
import ViewCareer from "../components/shared/ViewCareer";
import ViewMajor from "../components/shared/ViewMajor";
import ViewSpecialization from "../components/shared/ViewSpecialization";
import ViewUnit from "../components/shared/ViewUnit";

import { Button } from "@material-ui/core";

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 27/09/2021
 * Description: Routing page for information pages
 */
//Notes - remove button, test function, test route and usehistory after testing concluded or comment out

//Information page router
function InfoPageRouter() {
    return (
        <Switch>
            <Route exact path="/InfoPage/ViewCareer/:id">
                <ViewCareer />
            </Route>
            <Route exact path="/InfoPage/ViewMajor/:id">
                <ViewMajor />
            </Route>
            <Route exact path="/InfoPage/ViewSpecialization/:id">
                <ViewSpecialization />
            </Route>
            <Route exact path="/InfoPage/ViewUnit/:id">
                <ViewUnit />
            </Route>
        </Switch>
    );
}

/*
<Route exact path="/InfoPage/Test">
    <Test />
</Route>

function Test() {
    const history = useHistory();
    return (
        <div>
            <Button onClick={() => {
                history.push("/InfoPage/ViewSpecialization/SPUC-ICBIO")
                //history.push("/InfoPage/ViewMajor/MJRU-HUMBM")
                //history.push("/InfoPage/ViewCareer/1xvftd1oiymx333qspd7gclw7ro")
            }}>
                Test
            </Button>
        </div>
    )
}*/

export default InfoPageRouter;