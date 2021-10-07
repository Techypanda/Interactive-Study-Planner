/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, useMediaQuery } from '@material-ui/core';
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
import { Career, CareerListProps, DefaultProps, Major, PromptData} from "../types";
import {useState, useEffect } from 'react';
import { BounceLoader } from "react-spinners";
import { useCareers, useMajors, useSpecializations, useUnits } from '../api/hooks';
import PlanList from '../components/UnitsFirst/PlanList';
import CareerList from '../components/UnitsFirst/CareerList';


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
    },
}))



export default function TopdownInitial(props : DefaultProps) { 
    const careers = useCareers();
    const majors = useMajors();
    const units = useUnits();
    const specs = useSpecializations();
    const classes = useStyles();
    const phone = useMediaQuery("(max-width: 488px)")
    const [error, setError] = useState<PromptData>({ promptTitle: "", promptContent: "", showPrompt: false})
    return (
        <Box>
            {careers.isLoading || majors.isLoading || units.isLoading || specs.isLoading
            ? <Box my={2}><BounceLoader color='#1473AB' loading={true} size={150}/></Box>
            :
            <>
                {careers.isError || majors.isError || units.isError || specs.isError 
                    ? <h1>Error Has Occurred</h1>
                    : <Grid container className='sameHeight'>
                        <Grid item xs={2} className='sameHeight'>
                            <EmptyCurrentPlan />
                        </Grid>
                        <Grid item xs={8} className='sameHeight'>
                            <TopDownInitialMain careers={careers.data?.data!} majors={majors.data?.data!} units={units.data?.data!} specs={specs.data?.data!} />
                        </Grid>
                        <Grid item xs={2} className='sameHeight'>
                            <CareerList careers={careers.data?.data!}/>     
                        </Grid>
                    </Grid>
                }
            </>
            }
        </Box>
    )
  
}