import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import { ListDataProps } from "../../types";
import styled from "styled-components";
import BulletPointIcon from "./BulletPointIcon";

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 24/08/2021
 * Description: Component that returns a list section that allows each item to be clickable.
 */
function InfoNav(props: String)
{
    const majorSpecHeads = ["MJRU", "SPUC"]
    //Retrieve first 4 characters of code
    const codeHead = props.substring(0,3);

    if (codeHead == majorSpecHeads[0])
    {
        //Nav to major info page
        console.log("Nav to major");
    }
    else if (codeHead == majorSpecHeads[1])
    {
        //Nav to spec info page
        console.log("Nav to spec");
    }
    else
    {
        //Nav to unit info page
        console.log("Nav to unit");
    }
    //END IF
}

//Returns list
function ListSection(props: ListDataProps)
{
    //Create list
    const dataList = props.list.map(function(item)
    {
        return(
            <ListItem button onClick={() => InfoNav(item)}>
                <ListItemIcon>
                    <BulletPointIcon />
                </ListItemIcon>
                <ListItemText primary={item} />
            </ListItem>
        );
    });

    return (
        <div className={props.className}>
            <Typography variant="h4" className="sectionHeading">
                {props.sectionHeading}
            </Typography>
            <List>
                {dataList}
            </List>
        </div>
    );
}

export default styled(ListSection)`
.sectionHeading {
    text-align: left;
    margin: 0px 0px 0px 14px;
}
`;