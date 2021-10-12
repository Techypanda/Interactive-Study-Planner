import {
  Box,
  Button,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import {
  Plan,
  Specialization,
  Unit,
  UnitFirstSPAContextProps,
} from "../../types";
import OptionCard from "../UnitsFirst/OptionCard";

function TopDownInitialMain(props: UnitFirstSPAContextProps) {
  const hidePagenav = useMediaQuery("(max-width: 755px)")
  const switchToOneCard = useMediaQuery('(max-width: 1500px)');
  const useStyles = makeStyles((theme) => ({
    innerCardOuterLeft: {
      filter: "blur(4px)",
      "z-index": -1,
    },
    innerCardCenter: {
      "z-index": 0,
    },
    innerCardOuterRight: {
      filter: "blur(4px)",
      "z-index": -1,
    },
    navigationIcon: {
      "background-color": "#cc9900 !important",
      color: "#FFF !important",
      "font-size": "50px !important",
      "border-radius": "100%",
      padding: "5px",
      cursor: "pointer",
    },
    inner: {
      position: "relative",
    },
    navIndicator: {
      "background-color": "#d9d9d9",
      border: "2px solid #777777",
    },
    active: {
      "background-color": "#777777",
    },
  }));
  const history = useHistory();
  const [currentSelection, setCurrentSelection] = useState(0);
  const classes = useStyles();
  const [plan, setPlan] = useState<Plan>({});
  const navPrevious = () => {
    const prevIDX =
      currentSelection - 1 < 0
        ? props.careers.length - 1
        : currentSelection - 1;
    setCurrentSelection(prevIDX);
  };

  const updateCareerUnits = (bestMajor: any, careerUnits: string[]) => {
    /* If the best major has a unit that matches our career units, remove it from career units
       We decrement i by 1 to prevent us skipping over the i+th element after using .splice()
    */
    for (var i = 0; i < careerUnits.length; i++) {
      if (bestMajor.Units.includes(careerUnits[i])) {
        careerUnits.splice(i, 1);
        i--;
      }
    }
  };
  //If the major unit does not already exist inside of units i am taking, we push it to the students current plan 
  const updateUnitsIAmTaking = (bestMajor: any, unitsIAmTaking: string[]) => {
    bestMajor.Units.forEach((majorUnit: any) => {
      if (!unitsIAmTaking.includes(majorUnit)) {
        unitsIAmTaking.push(majorUnit);
      }
    });
  };
  //Pick any major between 0 and the amount of majors that exist-1. As of now, this means choosing between 0 and 2 (3 majors)
  const findRandMajor = (majorResp: any) => {
    var min = 0;
    var max = majorResp.length;
    var randNum = Math.floor(Math.random() * (max - min) + min);
    var randMajor = majorResp[randNum];

    return randMajor;
  };

  const findBestInternalSpec = (
    specResp: any,
    careerUnits: string[],
    bestMajor: any
  ) => {
    let bestMatchLen = -1;
    var bestInternalSpec;
    var invalid = false;
    specResp.forEach((spec: any) => {
      let intersection = spec.Units.filter((item: any) =>
        careerUnits.includes(item)
      );
      //Check that the specialization is internal (IT MUST BE AT THIS POINT)
      if (spec.Internal === true) {
        spec.MajorAntiReqs[0].forEach((majorAntiReq: any) => {
          //check the specialization does not clash against the major selected
          if (majorAntiReq === bestMajor.MajorCode) {
            invalid = true;
          }
        });
        if (!invalid) {
          //if the length of this intersection is greater than the current best, update it (This means we have a new best match)
          if (intersection.length !== 0 && intersection.length > bestMatchLen) {
            bestMatchLen = intersection.length;
            bestInternalSpec = spec;
          }
        }
        //reset for next iteration (start by assuming each spec is valid by default)
        invalid = false;
      }
    });
    //If the best intersection length means we never update it (i.e., length 0 for all, meaning no matches at all), we find a random internal spec
    if (bestInternalSpec === undefined) {
      bestInternalSpec = findRandInternalSpec(specResp, bestMajor);
    }
    return bestInternalSpec;
  };
  //Find a random internal spec between 0 and the number of internal specializations that exist - 1
  const findRandInternalSpec = (specResp: any, bestMajor: any) => {
    var min = 0;
    var max = specResp.length;
    var found = false;
    var invalid = false;
    while (!found) {
      var randSpec = Math.floor(Math.random() * (max - min) + min);
      //Ensure it is an internal spec (MUST BE AT THIS POINT)
      if (specResp[randSpec].Internal === true) {
        for (let i = 0; i < specResp[randSpec].MajorAntiReqs[0]; i++) {
          const majorAntiReq: string = specResp[randSpec].MajorAntiReqs[0][i];
          //Check it does not clash with our major
          if (majorAntiReq === bestMajor.MajorCode) {
            invalid = true;
          }
        }
        //if it passes all these tests, return
        if (!invalid) {
          return specResp[randSpec];
        }
        //otherwise, start again with a new spec, once again assuming it's valid by default.
        invalid = false;
      }
    }
  };
  const findBestMajor = (majorResp: any, careerUnits: string[]) => {
    var bestMatchLen = -1;
    var bestMajor;
    majorResp.forEach((major: any) => {
      let intersection = major.Units.filter((item: any) =>
        careerUnits.includes(item)
      );
      //If the number of matched units exceeds the current best, update current best to match this. i.e., we have a new best major
      if (intersection.length !== 0 && intersection.length > bestMatchLen) {
        bestMatchLen = intersection.length;
        bestMajor = major;
      }
    });
    //However, should all intersections = 0, then we need to find a random major (since a student MUST be enrolled in a major)
    if (bestMajor === undefined) {
      bestMajor = findRandMajor(majorResp);
    }
    return bestMajor;
  };

  const findBestSpec = (
    specResp: any,
    careerUnits: string[],
    bestMajor: any,
    bestInternalSpec: any
  ) => {
    var bestSpec;
    var invalid = false;

    specResp.forEach((spec: any) => {
      let intersection = spec.Units.filter((item: any) =>
        careerUnits.includes(item)
      );
      //Check for major anti req clash
      spec.MajorAntiReqs[0].forEach((majorAntiReq: any) => {
        if (majorAntiReq === bestMajor.MajorCode) {
          invalid = true;
        }
      });
      //check for unit anti req clash
      spec.UnitAntiReqs[0].forEach((unitAntiReq: any) => {
        if (bestMajor.Units.includes(unitAntiReq)) {
          invalid = true;
        }
      });
      //check for spec anti req clash
      spec.SpecAntiReqs[0].forEach((specAntiReq: any) => {
        if (bestInternalSpec.SpecializationCode === specAntiReq) {
          invalid = true;
        }
      });
      /* if the spec is valid and the common units between career units and the spec units are equal
               (i.e., the remaining career units are within this spec), return the spec
               If we return bestSpec and it's undefined, then we know we did not find the match
               So, we continue to (5)
        */
      if (!invalid && intersection.length === careerUnits.length) {
        bestSpec = spec;
        return bestSpec;
      }
      invalid = false;
    });
    return bestSpec;
  };
  //If the units matching from the second major are equal to the remaining career units, we know we have a perfect match for a double major, 
  const remainingMatched = (majorResp: any, careerUnits: string[]) => {
    var matchCount = 0;
    careerUnits.forEach((careerUnit: any) => {
      if (majorResp.Units.includes(careerUnit)) {
        matchCount++;
      }
    });
    if (matchCount === careerUnits.length) {
      return true;
    }
    return false;
  };

  /*This is where all of the logic for finding best pathway is
  Namely, best major and specializations.
  Should a best major and/or specialization not exist, we will select a random major/specialization 
  */
  const doLogic = (careerId: string) => {
    const careerResponseData = props.careers;
    var planFinished = false;
    var individualCareer;

    //Find the major that they had selected
    for (var i = 0; i < careerResponseData.length; i++) {
      if (careerResponseData[i].CareerId === careerId) {
        individualCareer = careerResponseData[i];
      }
    }
    //The units from the selected career for us to work through
    var careerUnits = individualCareer?.Requirements!;
    var unitsIAmTaking: string[] = [];
    var commonUnits = [
      "MEDI1000",
      "HUMB1000",
      "BIOL1004",
      "CHEM1007",
      "INDH1006",
      "EPID1000",
      "HUMB1001",
      "GENE1000",
    ];

    //Push the 8 common units all students do straight away (This accounts for their entire first 2 semesters)
    commonUnits.forEach((unit: string) => {
      unitsIAmTaking.push(unit);
    });

    const unitResponseData = props.units;
    const specResponseData = props.specs;
    const majorResponseData = props.majors;
    const specArr: Specialization[] = [];

    //Attempt to find best major
    var bestMajor = findBestMajor(majorResponseData, careerUnits);
    //Need this to setLocalStorage so that units first can utilize it
    const temp = { ...plan };
    temp.mainMajor = bestMajor;
    setPlan(temp);
    localStorage.setItem(
      `${process.env.REACT_APP_DEVELOPMENT ? "dev-" : ""}courseplanner-plan`,
      JSON.stringify(temp)
    );
    //Update career units to reflect those found, which we remove. This is so we never consider them again in future steps, as they've already been taken care of
    updateCareerUnits(bestMajor, careerUnits);
    //Update the units the student will take. At the moment the student will have 16 units so far. 8 common units + 8 units from the major selected
    updateUnitsIAmTaking(bestMajor, unitsIAmTaking);
    //If career units is empty, then we know we have found all the units the career needed in the major selected, thus there's no need to search further
    if (careerUnits.length === 0) {
      planFinished = true;
    }


    //However, if we do not find all units from the single major, we first attempt to see if the rest can be found from the student taking a second major.
    if (!planFinished) {
      var secondBestMajor = findBestMajor(majorResponseData, careerUnits);
      //Check if the 'hits' from second best major matches the length of career units, thus meaning we can stop here
      if (remainingMatched(secondBestMajor, careerUnits)) {
        temp.doubleMajor = secondBestMajor;
        localStorage.setItem(
          `${process.env.REACT_APP_DEVELOPMENT ? "dev-" : ""
          }courseplanner-plan`,
          JSON.stringify(temp)
        );
        planFinished = true;
      }
    }
    //If we were unable to find all units from the second major, then we need to select ONE internal specialization. All students MUST complete at least one internal specialization with the exception of them doing a double major
    if (!planFinished) {
      var bestInternalSpec = findBestInternalSpec(
        specResponseData,
        careerUnits,
        bestMajor
      );
      //Since our plan may have 2 specs (We don't know yet), we push it to the specialization array for the units first page to use
      specArr.push(bestInternalSpec);

      temp.specializations = specArr;
      setPlan(temp);
      localStorage.setItem(
        `${process.env.REACT_APP_DEVELOPMENT ? "dev-" : ""}courseplanner-plan`,
        JSON.stringify(temp)
      );
      //Update career units to reflect those career units found, which we remove. This is so we never consider them again in future steps, as they've already been taken care of
      updateUnitsIAmTaking(bestInternalSpec, unitsIAmTaking);
      //Update the units the student will take. At the moment the student will have 20 units so far: 8 common units, 8 major units, and the 4 units for the internal specialization selected
      updateCareerUnits(bestInternalSpec, careerUnits);

      //Check if we can stop here (i.e., the career units were satisfied with 1 major and 1 internal spec)
      if (careerUnits.length === 0) {
        console.log("finished at ispec step 3");
        planFinished = true;
      }
    }
    //However, if we were unable to stop, we check if we are able to satisfy the remaining units with a second specialization. This specialization can either be an internal specialization or external.
    if (!planFinished) {
      var bestSpec = findBestSpec(
        specResponseData,
        careerUnits,
        bestMajor,
        bestInternalSpec
      );

      /*Best spec will return defined if it doesn't find a perfect match (meaning we need to move onto optional units)
        Thus, if it didn't return undefined, we can be certain it returned a perfect match and thus all the career units have been satisifed by a major, and 2 specializations
      */
      if (bestSpec !== undefined) {
        updateUnitsIAmTaking(bestSpec, unitsIAmTaking);
        specArr.push(bestSpec);
        temp.specializations = specArr;
        localStorage.setItem(
          `${process.env.REACT_APP_DEVELOPMENT ? "dev-" : ""
          }courseplanner-plan`,
          JSON.stringify(temp)
        );
        planFinished = true;
      }
    }
    //Final step. If the above steps did not work, and there's less than 5 (i.e., 4 units max) units remaining, we put the remaining units into the optional units for units first to use
    if (!planFinished) {
      var optionalUnits: Unit[] = [];
      if (careerUnits.length < 5) {
        for (i = 0; i < unitResponseData.length; i++) {
          if (careerUnits.includes(unitResponseData[i].UnitCode)) {
            optionalUnits.push(unitResponseData[i]);
          }
        }
        temp.optionalUnits = optionalUnits;
        localStorage.setItem(
          `${process.env.REACT_APP_DEVELOPMENT ? "dev-" : ""
          }courseplanner-plan`,
          JSON.stringify(temp)
        );
      }
    }
  };
  const navNext = () => {
    const nextIDX =
      currentSelection + 1 >= props.careers.length ? 0 : currentSelection + 1;
    setCurrentSelection(nextIDX);
  };
  const selectMajor = () => {
    const careerToPass = props.careers[currentSelection].CareerId;
    doLogic(careerToPass);
    history.push("/unitsfirst");
  };
  return (
    <Box
      className={props.className}
      minHeight="100%"
      minWidth="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box pt={2}>
        <Typography variant="h4">Please Select A Career</Typography>
        <Box display="flex" justifyContent="center" mt={8}>
          {" "}
          {/* TODO: Make these slide around like pokemon starter selector */}
          {(props.careers.length >= 3 && !switchToOneCard) && (
            <OptionCard
              className={classes.innerCardOuterLeft}
              style={{ transform: "translate(50px, -50px)" }}
              title="3"
              description="Lorem ipsum dolor sit amet, consectetur"
              type="Career"
            />
          )}
          <OptionCard
            className={classes.innerCardCenter}
            title={props.careers[currentSelection].Name}
            description={props.careers[currentSelection].Description}
            type="Career"
            onClick={() => selectMajor()}
          />
          {(props.careers.length >= 2 && !switchToOneCard) && (
            <OptionCard
              className={classes.innerCardOuterRight}
              style={{ transform: "translate(-50px, -50px)" }}
              title="I'm a really cool blurred 2nd major"
              description="Lorem ipsum dolor sit amet"
              type="Career"
            />
          )}
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => selectMajor()}
          >
            Select
          </Button>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
          <Box mr={2}>
            <NavigateBefore
              className={classes.navigationIcon}
              onClick={() => navPrevious()}
            />
          </Box>
          {!hidePagenav ? /* Just hide it on mobile */
            <>
              {props.careers.map((_, idx) => (
                <Box
                  mx={1}
                  key={idx}
                  className={`classes.navIndicator navIndicator ${idx === currentSelection ? "active" : ""
                    }`}
                  display="inline-block"
                  height={15}
                  width={15}
                  borderRadius="100%"
                />
              ))}
            </> : <></>}
          <Box ml={2}>
            <NavigateNext
              className={classes.navigationIcon}
              onClick={() => navNext()}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default styled(TopDownInitialMain)`
.navIndicator {
  background-color: #d9d9d9;
  border: 2px solid #777777;
}
.active {
  background-color: #777777;
}
`;