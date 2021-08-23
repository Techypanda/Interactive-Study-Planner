import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { ListDataProps }  from "../../types";
import styled from "styled-components";

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 23/08/2021
 * Description: Component that returns a formated list section composed from list data.
 */

function ListSection(props: ListDataProps)
{
    //Create list
    const dataList = props.list.map(function(item)
    {
        return(
            <ListItem>
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
}
`;