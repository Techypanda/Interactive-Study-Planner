/* eslint-disable @typescript-eslint/no-unused-vars */
import { CardContent , Grid, CardActions, ListSubheader, AppBar, Toolbar, Typography, Box, List, CardHeader, Avatar, Card, CardMedia, Switch, Checkbox } from '@material-ui/core';
//import { DefaultProps } from '../../types';
import { DefaultProps } from '../types';
import { borders, positions } from '@material-ui/system';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import BookOutlined from '@material-ui/icons/BookOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { CheckBox } from '@material-ui/icons';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import WifiIcon from '@material-ui/icons/Wifi'
import ListItemText from '@material-ui/core/ListItemText';
import CommentIcon from '@material-ui/icons/Comment';
//import CareerUnitInfoCard from './CareerUnitInfoCard'
import CareerUnitInfoCard from '../components/shared/CareerUnitInfoCard'
import TopDownFilledMain from '../components/shared/TopDownFilledMain';
import CurrentPlan from '../components/shared/CurrentPlan';
import AvailableCareersList from '../components/shared/AvailableCareersList';
//import TopDownInitialMain from '../components/shared/TopDownInitialMain';
import TopDownInitialMain from '../components/shared/TopDownInitialMain';
import EmptyCurrentPlan from '../components/shared/EmptyCurrentPlan';
import axios, { AxiosResponse } from 'axios'
import Error from '../components/shared/Error';
import ReactDOM from 'react-dom';
import { CareerProps,  ErrorProps,  MajorProps, CareerListProps} from "../types";
import React, {useState, useEffect } from 'react';
import { BounceLoader } from "react-spinners";


const useStyles = makeStyles((theme) => ({ 
    root: { 
        width: '100%',
        maxWidth: 360,
    },
    nonNavBar: {
        'height': '90vh',
        outline: '1px solid #d9b362'
    },
    test: { 
        'margin-top': 50
    }
}))

//Going to need to load career API
    //Pass that down to top down initial
        //Pass that down to TestCareerUnitInfoCard


export default function TopdownInitial() { 
    const classes = useStyles();
    const base : CareerListProps = {};
    const history = useHistory();
    const [careerList2, setCareerList] = useState<CareerListProps>(base);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [error, setErrorContent] = useState<string>();

    async function fetchData() { 
        try { 
            let careerArray : CareerProps[] = [];
            //const {data} = await axios.get("https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getallmajors");
            const {data} = await axios.get("https://q02l9qoni6.execute-api.ap-southeast-2.amazonaws.com/Prod/events/event-get-all-careers");

            let careerTitles2 : string[] = [];
            for(let i = 0 ; i < data.length; i++) { 
                careerTitles2[i] = data[i].Name;
            }
            let resp : CareerListProps = { 
                careerList : careerTitles2,
            }
            setCareerList(resp);
            setLoading(false);
        } catch(error) { 
            if(error && axios.isAxiosError(error)) { 
                const axiosResp = error.response as AxiosResponse;
                setErrorContent(axiosResp.data);
                setError(true);
                setLoading(false);
            } else { 
                setErrorContent("Error: " + error);
                setError(true);
                setLoading(false);
            }
        }
    }

    useEffect(() => { 
        fetchData();
    }, []);


    function backFunction() { 
        history.goBack();
    }

    if(isLoading) { 
        return(<BounceLoader color="#1473AB" loading={true} size={150}/>);
    }

    if(isError) { 
        return <Error promptTitle="Request Error" promptContent={error as string} showPrompt={true} onAccept={() => backFunction() } />
    }

    return (
        <>
            <Grid container justify={'space-between'} alignItems={'stretch'} className={classes.nonNavBar}>
                <Grid item xs={2}>
                    <EmptyCurrentPlan />
                </Grid>

                <Grid item xs={8} className={classes.test}>
                    <TopDownInitialMain/>
                </Grid>

                <Grid item xs={2}>
                    <AvailableCareersList careerList={careerList2.careerList} />
                </Grid>
            </Grid>
        </>
    )
}
