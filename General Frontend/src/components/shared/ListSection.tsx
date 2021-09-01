import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import { ListDataProps }  from "../../types";
import styled from "styled-components";
import BulletPointIcon from "./BulletPointIcon";


/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 31/08/2021
 * Description: Returns formated list from provided data
 */

//Returns list
function ListSection(props: ListDataProps)
{
    //Check if no data to display
    if (props.list === undefined || props.list[0][0] === "")
    {
        return(<div/>);
    }
    //END IF

    //Create list
    const dataList = props.list.map(function(item)
    {
        return(
            <ListItem>
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
            <List dense>
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