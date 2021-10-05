/* eslint-disable @typescript-eslint/no-unused-vars */
/*import { Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TestCareerUnitInfoCard from './TestCareerUnitInfoCard';



const useStyles = makeStyles((theme) => ({ 
    root: { 
        outline: '1px solid #d9b362',
        width: '100%',
        maxWidth: 360,
    },
    test: { 
        'margin-top': 50,

    }
}))


export default function TopDownInitialMain() { 
    const classes = useStyles();
    const history = useHistory();
        <>
            <Typography variant='h3' align='center'>
                Please Select A Career You Are Interested In
            </Typography>
            <Grid container justify={'center'} className={classes.test}>
                <TestCareerUnitInfoCard 
                    Code="1y2gwrzdtpg5d88ju3sauqognzm" 
                    Title="Analytical Chemist" 
                    Description="As an analytical chemist, you'll use a range of methods to 
                        investigate the chemical composition of substances." 
                />
                <TestCareerUnitInfoCard 
                    Code="1xvftd1oiymx333qspd7gclw7ro" 
                    Title="Biochemist" 
                    Description="Research the chemistry of living organisms to improve medicine,
                        veterinary science, agriculture, environmental science and manufacturing."
                />
                <TestCareerUnitInfoCard 
                    Code="1xvftatvovt1ezpickrerafcebl" 
                    Title="Dentist" 
                    Description="Diagnose and treat diseases, injuries , and abnormalities 
                        of teeth and gums, with preventive procedures, surgery, and other
                        specialist techniques."/> 
            </Grid>

        </>
    )
    )
}*/
import { Box, Button, Typography } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { idkwhatimdoing} from "../../types";
//import OptionCard from "../OptionCard";
import OptionCard from "../UnitsFirst/OptionCard";

// Viewport height - element.offset.top - desired bottom margin
//function Initial(props: InitialCareerSPAProps) {
export default function TopDownInitialMain(props: idkwhatimdoing) {
  const history = useHistory();
  const [currentSelection, setCurrentSelection] = useState(0);
  const navPrevious = () => {
    const prevIDX = currentSelection - 1 < 0 ? props.careers.length - 1 : currentSelection - 1;
    setCurrentSelection(prevIDX);
  }
  const navNext = () => {
    const nextIDX = currentSelection + 1 >= props.careers.length ? 0 : currentSelection + 1;
    setCurrentSelection(nextIDX);
  }
  const selectMajor = () => {
    const careerToPass = props.careers[currentSelection].CareerId;
    localStorage.setItem('careerSelect', careerToPass)
    history.push('/TopdownFilled2')
  }
  return (
    <Box className={props.className} minHeight="100%" minWidth="100%" display="flex" alignItems="center" justifyContent="center">
      <Box pt={2}>
        <Typography variant="h4">Please Select Your First Major</Typography>
        <Box display="flex" justifyContent="center" mt={8}> {/* TODO: Make these slide around like pokemon starter selector */}
          {props.careers.length >= 3 &&
            <OptionCard
              className="inner card-outer-left"
              style={{ transform: "translate(50px, -50px)" }}
              title="3"
              description="First couple words of career desc?"
              type="Career"
            />
          }
          <OptionCard
            className="inner card-center"
            title={props.careers[currentSelection].Name}
            description={props.careers[currentSelection].Description}
            type="Career"
            onClick={() => selectMajor()}
          />
          {props.careers.length >= 2 &&
            <OptionCard
              className="inner card-outer-right"
              style={{ transform: "translate(-50px, -50px)" }}
              title="I'm a really cool blurred 2nd major"
              description="First couple words of career desc?"
              type="Career"
            />
          }
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" onClick={() => selectMajor()}>Select</Button>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
          <Box mr={2}>
            <NavigateBefore className="navigationIcon" onClick={() => navPrevious()} />
          </Box>
          {props.careers.map((_, idx) => <Box mx={1} key={idx} className={`navIndicator ${idx === currentSelection ? 'activewoopog' : ''}`} display="inline-block" height={15} width={15} borderRadius="100%" />)}
          <Box ml={2}>
            <NavigateNext className="navigationIcon" onClick={() => navNext()} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}