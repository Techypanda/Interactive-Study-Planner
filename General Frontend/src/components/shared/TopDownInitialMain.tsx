import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import {
  ImportantDevices,
  NavigateBefore,
  NavigateNext,
} from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import {
  careerListTopdown,
  Plan,
  Specialization,
  UnitFirstSPAContextProps,
} from "../../types";
//import OptionCard from "../OptionCard";
import OptionCard from "../UnitsFirst/OptionCard";

// Viewport height - element.offset.top - desired bottom margin
//function Initial(props: InitialCareerSPAProps) {
export default function TopDownInitialMain(props: UnitFirstSPAContextProps) {
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
      cursor: "pointer,",
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
    for (var i = 0; i < careerUnits.length; i++) {
      if (bestMajor.Units.includes(careerUnits[i])) {
        careerUnits.splice(i, 1);
        i--;
      }
    }
  };

  const updateUnitsIAmTaking = (bestMajor: any, unitsIAmTaking: string[]) => {
    bestMajor.Units.forEach((majorUnit: any) => {
      if (!unitsIAmTaking.includes(majorUnit)) {
        unitsIAmTaking.push(majorUnit);
      }
    });
  };

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
      if (spec.Internal === true) {
        spec.MajorAntiReqs[0].forEach((majorAntiReq: any) => {
          if (majorAntiReq == bestMajor.MajorCode) {
            invalid = true;
          }
        });
        if (!invalid) {
          if (intersection.length != 0 && intersection.length > bestMatchLen) {
            bestMatchLen = intersection.length;
            bestInternalSpec = spec;
          }
        }
        invalid = false;
      }
    });
    if (bestInternalSpec === undefined) {
      bestInternalSpec = findRandInternalSpec(specResp, bestMajor);
    }
    return bestInternalSpec;
  };

  const findRandInternalSpec = (specResp: any, bestMajor: any) => {
    var min = 0;
    var max = specResp.length;
    var found = false;
    var invalid = false;
    while (!found) {
      var randSpec = Math.floor(Math.random() * (max - min) + min);
      if (specResp[randSpec].Internal === true) {
        specResp[randSpec].MajorAntiReqs[0].forEach((majorAntiReq: string) => {
          if (majorAntiReq == bestMajor.MajorCode) {
            invalid = true;
          }
        });
        if (!invalid) {
          return specResp[randSpec];
        }
        invalid = false;
      }
    }
  };
  const findBestMajor = (majorResp: any, careerUnits: string[]) => {
    const temp = { ...plan };
    var bestMatchLen = -1;
    var bestMajor;
    majorResp.forEach((major: any) => {
      let intersection = major.Units.filter((item: any) =>
        careerUnits.includes(item)
      );
      if (intersection.length != 0 && intersection.length > bestMatchLen) {
        bestMatchLen = intersection.length;
        bestMajor = major;
      }
    });

    if (bestMajor === undefined) {
      bestMajor = findRandMajor(majorResp);
    }
    console.log("best major in findbestMajor()");
    console.log(bestMajor);
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
        if (majorAntiReq == bestMajor.MajorCode) {
          invalid = true;
        }
      });
      spec.UnitAntiReqs[0].forEach((unitAntiReq: any) => {
        if (bestMajor.Units.includes(unitAntiReq)) {
          invalid = true;
        }
      });
      spec.SpecAntiReqs[0].forEach((specAntiReq: any) => {
        if (bestInternalSpec.SpecializationCode == specAntiReq) {
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

  const doLogic = (careerId: string) => {
    //var bestMajor = findBestMajor()
    const careerResponseData = props.careers;
    var planFinished = false;
    var individualCareer;
    for (var i = 0; i < careerResponseData.length; i++) {
      if (careerResponseData[i].CareerId == careerId) {
        console.log("matched career");
        individualCareer = careerResponseData[i];
      }
    }

    var careerUnits = individualCareer?.Requirements!;
    careerUnits.push("MICB3002", "XD");
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
    console.log("units im taking content before");
    console.log(unitsIAmTaking);
    commonUnits.forEach((unit: string) => {
      unitsIAmTaking.push(unit);
    });
    console.log(unitsIAmTaking);

    const unitResponseData = props.units;
    const specResponseData = props.specs;
    const majorResponseData = props.majors;
    const specArr: Specialization[] = [];
    var bestMajor = findBestMajor(majorResponseData, careerUnits);
    const temp = { ...plan };
    temp.mainMajor = bestMajor;
    setPlan(temp);
    localStorage.setItem(
      `${process.env.REACT_APP_DEVELOPMENT ? "dev-" : ""}courseplanner-plan`,
      JSON.stringify(temp)
    );

    //update career units
    console.log("career units updated: ");
    updateCareerUnits(bestMajor, careerUnits);
    console.log(careerUnits);
    //update unitsIamtaking
    console.log("units i am taking updated: ");
    updateUnitsIAmTaking(bestMajor, unitsIAmTaking);
    console.log(unitsIAmTaking);

    if (careerUnits.length === 0) {
      console.log("finished at step 1");
      planFinished = true;
    }

    if (!planFinished) {
      //find second major if possible
      var secondBestMajor = findBestMajor(majorResponseData, careerUnits);
      if (remainingMatched(secondBestMajor, careerUnits)) {
        temp.doubleMajor = secondBestMajor;
        localStorage.setItem(
          `${
            process.env.REACT_APP_DEVELOPMENT ? "dev-" : ""
          }courseplanner-plan`,
          JSON.stringify(temp)
        );
        planFinished = true;
      }
    }

    if (!planFinished) {
      var bestInternalSpec = findBestInternalSpec(
        specResponseData,
        careerUnits,
        bestMajor
      );
      specArr.push(bestInternalSpec);

      temp.specializations = specArr;
      setPlan(temp);
      localStorage.setItem(
        `${process.env.REACT_APP_DEVELOPMENT ? "dev-" : ""}courseplanner-plan`,
        JSON.stringify(temp)
      );

      updateUnitsIAmTaking(bestInternalSpec, unitsIAmTaking);
      updateCareerUnits(bestInternalSpec, careerUnits);
      if (careerUnits.length === 0) {
        console.log("finished at ispec step 3");
        planFinished = true;
      }
    }

    if (!planFinished) {
      var bestSpec = findBestSpec(
        specResponseData,
        careerUnits,
        bestMajor,
        bestInternalSpec
      );
      if (bestSpec != undefined) {
        updateUnitsIAmTaking(bestSpec, unitsIAmTaking);
        specArr.push(bestSpec);
        temp.specializations = specArr;
        localStorage.setItem(
          `${
            process.env.REACT_APP_DEVELOPMENT ? "dev-" : ""
          }courseplanner-plan`,
          JSON.stringify(temp)
        );
        planFinished = true;
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
          {props.careers.length >= 3 && (
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
          {props.careers.length >= 2 && (
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
          {/*{props.careers.map((_, idx) => <Box mx={1} key={idx} className={`navIndicator ${idx === currentSelection ? 'activewoopog' : ''}`} display="inline-block" height={15} width={15} borderRadius="100%" />)} */}
          {props.careers.map((_, idx) => (
            <Box
              mx={1}
              key={idx}
              className={`classes.navIndicator ${
                idx === currentSelection ? "active" : ""
              }`}
              display="inline-block"
              height={15}
              width={15}
              borderRadius="100%"
            />
          ))}
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
