/* eslint-disable @typescript-eslint/no-unused-vars */
import { List } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import BookOutlined from '@material-ui/icons/BookOutlined';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles((theme) => ({
    root: { 
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        outline: '1px solid #d9b362',
        height: '100%'
    }
}))


export default function AvailableCareersList(props: any) { 
    const history = useHistory();
    const classes = useStyles();
    let careerObj = props.careerObj || [];

    function goToCareerInfoPage(value:any) { 
        history.push(`./InfoPage/ViewCareer/${value.CareerId}`);
    }

    return ( 
        <List className={classes.root}>
            {careerObj.map((value: any) => {
                const labelId = `checkbox-list-label-${value}`;
                return (
                    <ListItem key={value} role={undefined} dense button onClick={() => goToCareerInfoPage(value)}>
                        <ListItemText id={labelId} primary={`${value.Name}`} />
                        <ListItemSecondaryAction>
                            <IconButton edge='end' aria-label='comments'>
                                <BookOutlined />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            })}
        </List>
        )

}