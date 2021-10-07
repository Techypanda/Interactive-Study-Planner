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
            <Error onAccept={() => setError({ promptTitle: error.promptTitle, promptContent: error.promptContent, showPrompt: false})} promptTitle={error.promptTitle} promptContent={error.promptContent} showPrompt={error.showPrompt} />
                <Grid container className='sameHeight'> 
                    <Grid item xs={2} className='sameHeight'>
                        <EmptyCurrentPlan />
                    </Grid>
                    <Grid item xs={8} className='sameHeight'>
                        {careers.isLoading || majors.isLoading || units.isLoading || specs.isLoading
                        ? <Box my={2}><BounceLoader color='#1473AB' loading={true} size={150}/></Box>
                        :
                        <>
                            {careers.isError || majors.isError || units.isError || specs.isError
                                ? <h1>Error occurred</h1>
                                : <TopDownInitialMain careers={careers.data?.data!} majors={majors.data?.data!} units={units.data?.data!} specs={specs.data?.data!} />
                            }
                        </>
                    }
                    </Grid>
                    <Grid item xs={2} className='sameHeight'>
                        <CareerList careers={careers.data?.data!} />
                    </Grid>
                </Grid>
        </Box>
    )
}
    /*return ( 
        <>
            <Grid container justify={'space-between'} alignItems={'stretch'} className={classes.nonNavBar}>
                <Grid item xs={2}>
                    <EmptyCurrentPlan />
                </Grid>
                <Box>
                    {careers.isLoading || majors.isLoading || units.isLoading || specs.isLoading
                    ? <Box my={2}><BounceLoader color='#1473AB' loading={true} size={150}/></Box>
                    :
                    <>
                        {careers.isError || majors.isError || units.isError || specs.isError
                            ? <h1>Error occurred</h1>
                            : <TopDownInitialMain careers={careers.data?.data!} majors={majors.data?.data!} units={units.data?.data!} specs={specs.data?.data!}/>
                        }
                    </>
                }
                </Box>
                <Grid item xs={2}>
                    <AvailableCareersList careerObj={careers.data?.data!}/>
                </Grid>
            </Grid>
        </>
    )
}*/