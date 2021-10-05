import { makeStyles } from '@material-ui/core/styles';
import React, {useEffect, useState } from 'react';
import { Career, CareerProps, MajorProps, Plan, Specialization, Unit, UnitFirstSPAContextProps } from "../types";
//import LoadingScreen from '../components/shared/Loading';
import Error from '../components/shared/Error';

import { useHistory } from 'react-router-dom';
import { useCareers, useMajors, useUnits, useSpecializations, useCareer } from '../api/hooks'
import { Box } from '@material-ui/core'
import { BounceLoader } from 'react-spinners'
import UnitsFirstSPAContext from '../components/UnitsFirst/UnitsFirstSPAContext'
import CareerEntry from '../components/shared/CareerEntry';
import { specialChars } from '@testing-library/user-event';

const useStyles = makeStyles((theme) => ({ 
    careersList: { 
        'width': 300,
    },
    nonNavBar: {
        'height': '90vh'
    },
    test: {
        'margin-top': 50,
    }, 
    test2: { 
        'justifyContent': 'space-between'
    },
    root: { 
        width:'100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        outline: '1px solid #d9b362',
        height: '100%'
    },
}))

function backFunction() { 
    //history.push to initial?
    //alert 1 for now
    alert(1)
}
function findBestInternalSpec(specResp : any, careerUnits : string[], bestMajor : any) { 
    let bestMatchLen = -1;
    var bestInternalSpec;
    var invalid = false;
    specResp.forEach((spec : any) => { 
        let intersection = spec.Units.filter((item : any) => careerUnits.includes(item))
        if(spec.Internal === true) { 
            spec.MajorAntiReqs[0].forEach((majorAntiReq : any) => { 
                if(majorAntiReq == bestMajor.MajorCode) { 
                    invalid = true;
                }
            })
            if(!invalid) { 
                if(intersection.length != 0 && intersection.length > bestMatchLen) { 
                    bestMatchLen = intersection.length
                    bestInternalSpec = spec;
                }
            } 
            invalid = false;
        }
    })
    if(bestInternalSpec === undefined) { 
        bestInternalSpec = findRandInternalSpec(specResp, bestMajor)
    }
    return bestInternalSpec;
}

function findBestSpec(specResp : any, careerUnits : string[], bestMajor : any, bestInternalSpec : any) { 
    var bestSpec;
    var invalid = false;

    specResp.forEach((spec : any) => { 
        let intersection = spec.Units.filter((item : any) => careerUnits.includes(item))
        //Check for major anti req clash
        spec.MajorAntiReqs[0].forEach((majorAntiReq : any) => { 
            if(majorAntiReq == bestMajor.MajorCode) { 
                invalid = true;
            }
        })
        spec.UnitAntiReqs[0].forEach((unitAntiReq : any) => { 
            if(bestMajor.Units.includes(unitAntiReq)) { 
                invalid = true;
            }
        })
        spec.SpecAntiReqs[0].forEach((specAntiReq : any) => { 
            if(bestInternalSpec.SpecializationCode == specAntiReq) { 
                invalid = true;
            }
        })
        /* if the spec is valid and the common units between career units and the spec units are equal
               (i.e., the remaining career units are within this spec), return the spec
               If we return bestSpec and it's undefined, then we know we did not find the match
               So, we continue to (5)
        */
        if(!invalid && intersection.length === careerUnits.length) { 
            bestSpec = spec;
            return bestSpec;
        }
        invalid = false;
    })
    return bestSpec;
}


function findBestMajor(majorResp : any, careerUnits : string[]) { 
    let bestMatchLen = - 1;
    var bestMajor;
    majorResp.forEach((major : any) => { 
        /* This represents all matched units between the current major and the career units.
           Thus, if we track the major with the highest length intersection, we can be sure
           that we have selected the closest major */
        let intersection = major.Units.filter((item : any) => careerUnits.includes(item))
        if(intersection.length != 0 && intersection.length > bestMatchLen) { 
            //keep track of best match so we can update should the next major be better
            bestMatchLen = intersection.length;
            //Assign bestMajor to the current best match to return
            bestMajor = major;
        }
        /* Should we find no matches, (i.e., ALL majors had NO common units with the career units)
           then we need to pick a random major. This is because ANY valid Biomedicine plan MUST
           contain a major */
    })
    /* Should we find no matches, (i.e., ALL majors had NO common units with the career's required units)
       then we need to pick a random major. This is because ANY valid Biomedicine plan MUST 
       contain a major */
    if(bestMajor === undefined) { 
        console.log('inside undefined check')
        bestMajor = findRandMajor(majorResp)
    }
    console.log('Best major is: ')
    console.log(bestMajor)
    return bestMajor
}

function findRandMajor(majorResp : any) { 
    var min = 0;
    var max = majorResp.length;
    //Test find rand major to ensure it includes ALL majors (expect 3 possible major codes)
    var randNum = Math.floor(Math.random() * (max - min) + min);
    var randMajor = majorResp[randNum]
    return randMajor;
}

function findRandInternalSpec(specResp : any, bestMajor : any) { 
    var min = 0;
    var max = specResp.length;
    var found = false;
    var invalid = false;
    while(!found) { 
        var randSpec = Math.floor(Math.random() * (max - min) + min);
        if(specResp[randSpec].Internal === true) { 
            specResp[randSpec].MajorAntiReqs[0].forEach((majorAntiReq : string) => { 
                if(majorAntiReq == bestMajor.MajorCode) { 
                    invalid = true;
                }
            })
            if(!invalid) { 
                return specResp[randSpec]
            }
            invalid = false;
        }
    }
}
/* Update career units to remove units matched so they are no longer in the pool of units to fulfil with
   the remainder of the plan */
function updateCareerUnits(bestMajor : any, careerUnits : string[]) { 
    for(var i = 0; i < careerUnits.length; i++) { 
        if(bestMajor.Units.includes(careerUnits[i])) { 
            careerUnits.splice(i, 1)
            i--;
        }
    }  
}

function updateUnitsIAmTaking(bestMajor : any, unitsIAmTaking: string[]) { 
    bestMajor.Units.forEach((majorUnit : any) => { 
        if(!(unitsIAmTaking.includes(majorUnit))) { 
            unitsIAmTaking.push(majorUnit)
        }
    })
}

function remainingMatched(bestMajor : any, careerUnits : string[]) { 
    var matchCount = 0;
    careerUnits.forEach((careerUnit : any) => { 
        if(bestMajor.Units.includes(careerUnit)) { 
            matchCount++;
        }
    })
    if(matchCount === careerUnits.length) { 
        return true;
    }
    return false;
}

function findOptionalUnits(unitResp : any, careerUnits : string[], unitsIAmTaking : string[]) { 
    const commonUnits = [
      "MEDI1000",
      "HUMB1000",
      "BIOL1004",
      "CHEM1007",
      "INDH1006",
      "EPID1000",
      "HUMB1001",
      "GENE1000" 
    ]
    console.log('units i am taking beofre we begin')
    console.log(unitsIAmTaking)
    console.log('career units before we begin: ')
    console.log(careerUnits)
    var count = 0
    while(count < 3) {
    for(var i = 0; i < unitResp.length; i++) { 
        if(careerUnits.includes(unitResp[i].UnitCode)) { 
            var validPaths = [];
            var allIntersectionLen : number[] = []
            var allIntersectionIndex : number[] =  []
            for(var j = 0; j < unitResp[i].Prerequistes.length; j++) { 
                var valid = true;
                var unitExistInDb = 0;
                for(var k = 0; k < unitResp[i].Prerequistes[j].length; k++) { 
                    let isNum = /^\d+$/.test(unitResp[i].Prerequistes[j][k])
                    if(isNum) { 
                        valid = false;
                    }
                    for(var l = 0; l < unitResp.length; l++) { 
                        if(unitResp[l].UnitCode == unitResp[i].Prerequistes[j][k]) {
                            unitExistInDb++;
                            for(var m = 0; m < unitsIAmTaking.length; m++) { 
                                if(unitResp[l].Antirequistes.includes(unitsIAmTaking[m])) { 
                                    valid = false;
                                }
                            }
                        }
                    }
                    if(commonUnits.includes(unitResp[i].Prerequistes[j][k])) {
                        unitExistInDb++;
                    }
                }
                if(valid && unitExistInDb >= unitResp[i].Prerequistes[j].length) { 
                    validPaths.push(unitResp[i].Prerequistes[j])
                }
                valid = true;
                unitExistInDb = 0;
            }
            //below is the list of valid paths for unitResp[i]
            //now that we have the valid paths, we choose the best.
            for(j = 0; j < validPaths.length; j++) { 
                let intersection = validPaths[j].filter((item : any) => unitsIAmTaking.includes((item)))
                allIntersectionIndex.push(j)
                allIntersectionLen.push(intersection.length)
            }
            var currBestLen = -1;
            var currBestIndex = -1;
            for(j = 0; j < allIntersectionLen.length; j++) { 
                if(allIntersectionLen[j] > currBestLen) { 
                    currBestLen = allIntersectionLen[j]
                    currBestIndex = allIntersectionIndex[j]
                }
            }
            if(currBestLen == validPaths[currBestIndex].length) {
                if(!careerUnits.includes(unitResp[i].UnitCode)) { 
                    careerUnits.push(unitResp[i].UnitCode)
                }
                if(!unitsIAmTaking.includes(unitResp[i].UnitCode)) { 
                    unitsIAmTaking.push(unitResp[i].UnitCode)
                }
            } else if (currBestLen == 0) { 
                var min = 0;
                var max = validPaths.length;
                var randNum = Math.floor(Math.random() * (max - min) + min);
                for(j = 0; j < validPaths[randNum].length; j++) {
                    if(!careerUnits.includes(validPaths[randNum][j]) && !commonUnits.includes(validPaths[randNum][j])) { 
                        careerUnits.push(validPaths[randNum][j])
                    }
                    if(!unitsIAmTaking.includes(validPaths[randNum][j])) { 
                        unitsIAmTaking.push(validPaths[randNum][j]);
                    }
                }
            } else { 
                var notIntersection = validPaths[currBestIndex].filter((item : any) => !unitsIAmTaking.includes((item)))
                var intersection = validPaths[currBestIndex].filter((item : any) => unitsIAmTaking.includes((item)))
                console.log(notIntersection)
                for(j = 0; j < notIntersection.length; j++) { 
                    if(!careerUnits.includes(notIntersection[j]) && !commonUnits.includes(notIntersection[j])) { 
                        careerUnits.push(notIntersection[j])
                    }
                    if(!unitsIAmTaking.includes(notIntersection[j])) { 
                        unitsIAmTaking.push(notIntersection[j])
                    }
                }
                for(j = 0; j < intersection.length; j++) { 
                    if(!careerUnits.includes(intersection[j]) && !commonUnits.includes(intersection[j])) { 
                        careerUnits.push(intersection[j])
                    }
                    if(!unitsIAmTaking.includes(intersection[j])) { 
                        unitsIAmTaking.push(intersection[j])
                    }
                }

            }
            currBestIndex = -1;
            currBestLen = -1;
            allIntersectionIndex = [];
            allIntersectionLen = [];
            validPaths = [];
        }
        
    }
    count++
}
    return careerUnits;
}

export default function TopdownFilled2() { 
    const selectedCareerId = localStorage.getItem('careerSelect') as string;
    const majors = useMajors();
    const units = useUnits();
    const specs = useSpecializations();
    const career = useCareer(selectedCareerId);
    const careers = useCareers();
    const [error, setErrorContent] = useState<string>();
    const [plan, setPlan] = useState<Plan>({})
    const specArr : Specialization[] = [];

    const history = useHistory();


    const commonUnits = [
        "MEDI1000",
        "HUMB1000",
        "BIOL1004",
        "CHEM1007",
        "INDH1006",
        "EPID1000",
        "HUMB1001",
        "GENE1000"
    ]



    if(career.isLoading || majors.isLoading || units.isLoading || specs.isLoading || careers.isLoading) { 
        return <BounceLoader color="#1473AB" loading={true} size={150} />
    }

    let careerResponseData = career.data?.data!;
    let careersResponseData = careers.data?.data!;
    let majorResponseData = majors.data?.data!;
    let unitResponseData = units.data?.data!;
    let specResponseData = specs.data?.data!



    if(!careerResponseData || !majorResponseData || !unitResponseData || !specResponseData || !careersResponseData) { 
        return <Error promptTitle="Request Error" promptContent={error as string} showPrompt={true} onAccept={() => backFunction() } />
    } else { 
        var planFinished = false;
        //This will contain all units the student is enrolled in
        //We will need this later should we need to find optional units for the student

        //start by putting in the 8 common units all students complete in first year 
        var unitsIAmTaking : string[] = [];
        commonUnits.forEach((commonUnit : string) => { 
            unitsIAmTaking.push(commonUnit)
        })


        //console.log('We will set career units to other units for the time being, since career data now is lacking')
        //var careerUnits = ["BCCB2000","BIOL2001","BIOL3010","BIOL3011","GENE2001","GENE3000","GENE3002","MEDI2010", "MEDI3016", "HUMB3008"];
        console.log('printing career')
        console.log(careerResponseData.Item)

        console.log('printing career units?')
        console.log(careerResponseData.Item.Requirements)

        var careerUnits = careerResponseData.Item.Requirements

        /* 
            (1) We attempt to find the best major.
            Should the major be a perfect match (i.e., every career unit is within the major),
                then we should stop searching.
            Otherwise we should find the best major (i.e., the major that has the most units matching the career)
            IF no career required units match a major at all, we return a random major.
                This is because ANY valid study plan MUST contain a major
        */
        var bestMajor = findBestMajor(majorResponseData, careerUnits)
        console.log('best major outside of function is: ')
        console.log(bestMajor)
        //Update career units so we know what is remaining to be found
        updateCareerUnits(bestMajor, careerUnits)
        //Update units the student is taking (At this stage it will be the 8 common units + the 8 major units)
        updateUnitsIAmTaking(bestMajor, unitsIAmTaking)
        plan.mainMajor = bestMajor

        if(careerUnits.length === 0) { 
            //finished after 1 major
            planFinished = true;
        }
        /* (2) We check if we can complete the plan with 2 majors
           Should the second major fulfil the remaining career units (i.e., the remaining career units were within the second major)
               then we should stop searching
            Otherwise, we DO NOT update career units OR unitsIAmTaking
               If we cannot find a perfect match WE DO NOT USE the second major. We explore the other 'paths'
        */
        if(!planFinished) { 
            var secondBestMajor = findBestMajor(majorResponseData, careerUnits)
            if(remainingMatched (secondBestMajor, careerUnits)) { 
                updateUnitsIAmTaking(secondBestMajor, unitsIAmTaking)
                plan.doubleMajor = secondBestMajor
                planFinished = true;
            }
        }
        /* 
            (3) We attempt to find the best INTERNAL spec.
            Should the specialization fulfil the remaining career units (i.e., the remaining career units were within the specialization selected)
                then we stop searching
            Otherwise we should find the best spec (i.e., the spec that has the most units within matching the career)
            IF no career required units match a spec at all, we return a random INTERNAL spec
               This is because ANY valid study plan MUST contain an internal specialization (Should it not be a double major)
        */
        if(!planFinished) { 
            
            var bestInternalSpec = findBestInternalSpec(specResponseData, careerUnits, bestMajor);
            specArr.push(bestInternalSpec)
            plan.specializations = specArr;
            updateUnitsIAmTaking(bestInternalSpec, unitsIAmTaking)
            updateCareerUnits(bestInternalSpec, careerUnits)
            if(careerUnits.length === 0) { 
                planFinished = true;
            }
        }

        /* 
            (4) We attempt to find ANY best spec
            Should this specialization fulfil the remaining career units (i.e., the remaining career units were within the specialization selected)
                then stop searching
            Otherwise, we should find the best spec (i.e., the spec that has the most units within matching the career)
            IF no career required units match a spec at all, then we do not select a specialization
                Instead, we move onto (5)
            I.e., if this step does not match the remaining career units, we do not select a specialization at all
        */
        if(!planFinished) { 
            var bestSpec = findBestSpec(specResponseData, careerUnits, bestMajor, bestInternalSpec)
            if(bestSpec != undefined) { 
                updateUnitsIAmTaking(bestSpec, unitsIAmTaking)
                specArr.push(bestSpec)
                plan.specializations = specArr;
                planFinished = true;
            }
        }

        if(!planFinished) { 
            var optionalUnits : string[] = [];
            optionalUnits = findOptionalUnits(unitResponseData, careerUnits, unitsIAmTaking);
            var optionalUnitsForBottomUp : Unit[] = [];
            if(optionalUnits.length > 4) {
                console.log('Do something to show it failing')
                //alert(careerUnits)
                //alert('fail')
            } else { 
                for(var j  = 0; j < unitResponseData.length; j++) { 
                    if(optionalUnits.includes(unitResponseData[j].UnitCode)) { 
                        optionalUnitsForBottomUp.push(unitResponseData[j])
                    }
                }
                console.log('optional units bottom up contains')
                console.log(optionalUnitsForBottomUp)
                console.log('career unit contains')
                console.log(careerUnits)
                plan.optionalUnits = optionalUnitsForBottomUp;
            }
        }




    //Pass study plan onto bottom up for display
    console.log('main major before setting local storage printing from plan')
    console.log(plan.mainMajor)
    localStorage.setItem(`${process.env.REACT_APP_DEVELOPMENT ? "dev-" : ""}courseplanner-plan`, JSON.stringify(plan))
    localStorage.setItem(`${process.env.REACT_APP_DEVELOPMENT ? "dev-" : ""}123`, JSON.stringify(plan))
    const temp = JSON.parse(JSON.stringify(plan));
    console.log('before timeout - printing temp')
    console.log(temp)
    localStorage.setItem(`${process.env.REACT_APP_DEVELOPMENT ? "dev-" : ""}courseplanner-plan`, JSON.stringify(temp))
    console.log('printing temp after set item')
    console.log(temp)
    return( 
        <></>
    )
}
}