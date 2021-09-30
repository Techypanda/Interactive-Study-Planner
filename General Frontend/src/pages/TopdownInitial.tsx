/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from '@material-ui/core';
//import { DefaultProps } from '../../types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
//import CareerUnitInfoCard from './CareerUnitInfoCard'
import AvailableCareersList from '../components/shared/AvailableCareersList';
//import TopDownInitialMain from '../components/shared/TopDownInitialMain';
import TopDownInitialMain from '../components/shared/TopDownInitialMain';
import EmptyCurrentPlan from '../components/shared/EmptyCurrentPlan';
import axios, { AxiosResponse } from 'axios'
import Error from '../components/shared/Error';
import { CareerListProps} from "../types";
import {useState, useEffect } from 'react';
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
            const {data} = await axios.get("https://q02l9qoni6.execute-api.ap-southeast-2.amazonaws.com/Prod/events/event-get-all-careers");
            setCareerList(data);
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
                    <AvailableCareersList careerObj={careerList2} />
                </Grid>
            </Grid>
        </>
    )
}
