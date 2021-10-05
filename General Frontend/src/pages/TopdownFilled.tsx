import { makeStyles } from '@material-ui/core/styles';
//import Navbar from "../components/shared/Navbar";
import React, {useState } from 'react';
//import { Grid } from '@material-ui/core';
//import CurrentPlan from "../components/shared/CurrentPlan"
//import TopDownFilledMain from '../components/shared/TopDownFilledMain';
//import AvailableCareersList from '../components/shared/AvailableCareersList';
import { Career, CareerProps, MajorProps, Plan, Specialization, Unit, UnitFirstSPAContextProps } from "../types";
//import LoadingScreen from '../components/shared/Loading';
import Error from '../components/shared/Error';

import { useHistory } from 'react-router-dom';
import { useCareers, useMajors, useUnits, useSpecializations, useCareer } from '../api/hooks'
import { Box } from '@material-ui/core'
import { BounceLoader } from 'react-spinners'
import UnitsFirstSPAContext from '../components/UnitsFirst/UnitsFirstSPAContext'

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
    alert(1)
}
function updatePlanUnits(allUnits : string[], dataResp : any) { 
    dataResp.Units.forEach((unit : any) => { 
        allUnits.push(unit)
    })
}


function areRemainingMatched(bestMajor : any, careerUnits : string[]) { 
    var matchCount = 0;
    for(var i = 0; i < careerUnits.length; i++) { 
        if(bestMajor.Units.includes(careerUnits[i])) { 
            matchCount++;
        }
    }
    if(matchCount === careerUnits.length) { 
        return true;
    }
    return false;
}

function getPreReqs(unitResp : any, careerUnits : string[], allUnits : string[]) { 
    console.log('inside get pre reqs')
    const optionalUnits : Unit[] = [];
    var currBestMaxLen = -1;
    var currBestIndex = -1;
    var allIntersectionLen : number[] = [];
    var allIntersectionIndex : number[] = [];
    console.log(unitResp.includes('HUMB2014'))
var totalIter = 0;
while(totalIter < 3) {
    for(var i =0; i < unitResp.length; i++) { 
        if(careerUnits.includes(unitResp[i].UnitCode)) { 
            console.log(i)
            console.log('match for ' + unitResp[i].UnitCode)
            for(var j = 0; j < unitResp[i].Prerequistes.length; j++) { 
                let intersection = unitResp[i].Prerequistes[j].filter((item : any) => allUnits.includes((item)))
                allIntersectionLen.push(intersection.length)
                allIntersectionIndex.push(j)
            }
            for(j = 0; j < allIntersectionLen.length; j++) { 
                if(allIntersectionLen[j] > currBestMaxLen) { 
                    currBestMaxLen = allIntersectionLen[j]
                    currBestIndex = allIntersectionIndex[j];
                }
            }
            var isInDb = false;
            var matchCount = 0;
            while(!isInDb){
                for(j = 0; j < unitResp[i].Prerequistes[currBestIndex].length; j++) { 
                    for(var k = 0; k < unitResp.length; k++) { 
                        if(unitResp[k].UnitCode == unitResp[i].Prerequistes[currBestIndex][j]) { 
                            matchCount++;
                        }
                    }
                }
                //maybe move this up a loop? I am not sure :monocle: 
                if(matchCount == unitResp[i].Prerequistes[currBestIndex].length) { 
                    console.log('All pre reqs exist in db. continue')
                    isInDb = true;
                } else  {
                    console.log('Find a new set of pre reqs bud')
                    currBestMaxLen = -1;
                    var oldBestIndex = currBestIndex
                    matchCount = 0;
                    for(j = 0; j < allIntersectionLen.length; j++) { 
                        if(allIntersectionLen[j] > currBestMaxLen && allIntersectionIndex[j] != oldBestIndex) { 
                            currBestMaxLen = allIntersectionLen[j]
                            currBestIndex = allIntersectionIndex[j]
                        }
                    }
                }
            }
            console.log('passed getting best intersection len')
            //if(allIntersect)
            
            console.log('curr best index = ' + currBestIndex)
            if(currBestMaxLen == unitResp[i].Prerequistes[currBestIndex].length) { 
                //This means we have a perfect match for the pre requisites already
                console.log('perfect match?')
                console.log('add ' + unitResp[i].UnitCode + ' to list of units')
                //add careerUnit into allUnit
                if(!(allUnits.includes(unitResp[i].UnitCode))) { //make sure we don't add duplicates
                    allUnits.push(unitResp[i].UnitCode)
                }
                if(!(careerUnits.includes(unitResp[i].UnitCode))) { 
                    careerUnits.push(unitResp[i].UnitCode)
                }
                //break;
            }
            else if(currBestMaxLen == 0) { 
                //This means we had no matches for ANY of the pre reqs
                console.log('no matches for any of ' + unitResp[i].UnitCode + 's prereqs')
                console.log('we could choose a random set of pre reqs here?')
                console.log('adding some unit here xD')
                let min = 0;
                let max = unitResp[i].Prerequistes.length;
                var found = false;
                let randNum = 0;
                var reset = false;
                while(!found) {
                    if(reset) {randNum = Math.floor(Math.random() * (max - min) + min) }
                    for(j = 0; j < unitResp[i].Prerequistes[randNum].length; j++) { 
                        let isNum = /^\d+$/.test(unitResp[i].Prerequistes[randNum][j])
                        if(isNum) { 
                            console.log('element is a number')
                            reset = true;
                            continue;
                        }
                    }
                    found = true;
                }
                console.log('we chose a random pre req. it was: ')
                console.log(unitResp[i].Prerequistes[randNum])
                for(j = 0; j < unitResp[i].Prerequistes[randNum].length; j++) { 
                    if(!(allUnits.includes(unitResp[i].Prerequistes[randNum][j]))) {
                        allUnits.push(unitResp[i].Prerequistes[randNum][j])
                    } 
                }
                if(!(allUnits.includes(unitResp[i].UnitCode))) { 
                    allUnits.push(unitResp[i].UnitCode)
                }
            } else {
                //this means we had a partial match for at least ONE of the pre reqs (in the scenario it's units with OR)
                let notIntersection = unitResp[i].Prerequistes[currBestIndex].filter((item : any) => !allUnits.includes((item)))

                console.log('Partial match for: ' + unitResp[i].UnitCode)
                console.log('We are missing ' + notIntersection)
                //console.log(unitResp[i].Prerequistes[currBestIndex])
                console.log('and then add the career unit in')
                console.log('This is for ' + unitResp[i].UnitCode)
                //while not fin
                    //if we can't find it in db
                    //repeat with next best maxCurrIndex
                    //if we can
                    //fin = true
                for(j = 0; j < notIntersection.length; j++) {  //in case units require > 2 units with ORS between
                    if(!(allUnits.includes(notIntersection[j]))) { 
                        allUnits.push(notIntersection[j])
                    }
                    if(!(careerUnits.includes(notIntersection[j]))) { 
                        careerUnits.push(notIntersection[j])
                    }
                }

                if(!(allUnits.includes(unitResp[i].UnitCode))) { 
                    allUnits.push(unitResp[i].UnitCode)
                }
                if(!(careerUnits.includes(unitResp[i].UnitCode))) { 
                    careerUnits.push(unitResp[i].UnitCode)
                }
            } 
            //reset for next unit (if it exists) in career units
            allIntersectionIndex = []
            allIntersectionLen = [];
            currBestMaxLen = -1;
            currBestIndex = -1;
        }
    }
    /*for(i = 0; i < unitResp.length; i++) { 
        if(careerUnits.includes(unitResp[i].UnitCode) && !(optionalUnits.includes(unitResp[i].UnitCode))) { 
            console.log('match : ')
            console.log(unitResp[i])
            optionalUnits.push(unitResp[i])
        }
    }*/
    for(i = 0; i < unitResp.length; i++) { 
        if(careerUnits.includes(unitResp[i].UnitCode)) { 
            console.log('matched career unit :')
            console.log(unitResp[i].UnitCode)
            if(!optionalUnits.includes(unitResp[i])) { 
                optionalUnits.push(unitResp[i])
            }
        }
    }
    totalIter++;
}
    console.log('career units contains')
    console.log(careerUnits)
    console.log('all units contains')
    console.log(allUnits)
    console.log('optional units contains')
    console.log(optionalUnits)
    return optionalUnits;
}

function findBestISpecESpec(specResp : any, careerUnits : string[], majorCode : string, specCode : string) { 
    var maxLen = 0;
    var bestISpecESpec;
    var invalid = false;
    for(var i = 0; i < specResp.length; i++) { 
        let intersection = specResp[i].Units.filter((item : any) => careerUnits.includes((item)))
        if(intersection.length != 0) { 
            //check major anti reqs
            for(var j = 0; j < specResp[i].MajorAntiReqs.length; j++) { 
                if(specResp[i].MajorAntiReqs[j].includes(majorCode)) { 
                    invalid = true;
                }
            }
            //check spec anti req
            for(var j = 0; j < specResp[i].SpecAntiReqs.length; j++) { 
                if(specResp[i].SpecAntiReqs[j].includes(specCode)) { 
                    invalid = true;
                }
            }

            //check unit anti req
            for(j = 0; j < specResp[i].UnitAntiReqs.length; j++) { 
                if(careerUnits.includes(specResp[i].UnitAntiReqs[j])) { 
                    invalid = true;
                }
            }
            if(intersection.length > maxLen && !invalid) { 
                maxLen = intersection.length;
                bestISpecESpec = specResp[i]
            }
        }
    }
    return bestISpecESpec;
}

function updateCareerUnits(bestMajor : any, careerUnits : string[]) { 
    for(var i = 0; i < careerUnits.length; i++) { 
        if(bestMajor.Units.includes(careerUnits[i])) { 
            careerUnits.splice(i, 1);
            i--;
        }
    }
}

function findRandMajor(majorResp: any) { 
    var min = 0;
    var max = majorResp.length;
    var randNum = Math.floor(Math.random() * (max - min) + min);
    var randMajor = majorResp[randNum]
    return randMajor
}

function findRandISpec(specResp : any) { 
    var min = 0;
    var max = specResp.length;
    //TODO: MAKE SURE IT ACCOUNTS FOR ANTI REQS OF ALL KINDS
    var randMajorInternal = false;
    while(randMajorInternal === false) { 
        var randNum = Math.floor(Math.random() * (max - min) + min);
        if(specResp[randNum].Internal == true) { 
            return specResp[randNum]
        }
    }
}

function findRandISpecESpec(specResp : any, specCode : string, majorCode : string, careerUnits : string []) { 
    //TODO: Make sure it checks all major anti reqs and spec anti reqs and unit anti reqs
    var min = 0;
    var max = specResp.length;
    var invalid = false;
    var antiReqsAccountedFor = false;
    while(!antiReqsAccountedFor) { 
        invalid = false;
        var randNum = Math.floor(Math.random() *(max - min) + min);
        //check spec anti reqs
        for(var i = 0; i < specResp[randNum].SpecAntiReqs.length; i++) { 
            if(specResp[randNum].SpecAntiReqs[i].includes(specCode)) { 
                //invalid = false;
                invalid = true;
            }
        }
        //check major anti reqs
        for(i = 0; i < specResp[randNum].MajorAntiReqs.length; i++) { 
            if(majorCode.includes(specResp[randNum].MajorAntiReqs[i])) { 
                invalid = true;
            }
        }
        //check unit anti reqs
        for(i = 0; i < specResp[randNum].UnitAntiReqs.length; i++){ 
            if(careerUnits.includes(specResp[randNum].UnitAntiReqs[i])) { 
                invalid = true;
            }
        }
        if(!invalid) { 
            return specResp[randNum]
        }
    }
}

function findISpec(specResp : any, careerUnits : string[], majorCode : string) { 

    //TODO: make sure it checks all major anti reqs and spec anti reqs and unit anti reqs
    console.log('inside findISpec')
    console.log(majorCode)
    console.log(specResp)
    console.log(careerUnits)
    var maxLen = 0;
    var bestISpec
    var invalid = false;
    for(var i = 0; i < specResp.length; i++) { 
        let intersection = specResp[i].Units.filter((item : any) => careerUnits.includes((item)))
        if(intersection.length != 0 && specResp[i].Internal == true) { 
            //check major anti req
            for(var j = 0; j < specResp[i].MajorAntiReqs.length; j++) { 
                if(specResp[i].MajorAntiReqs[j].includes(majorCode)) { 
                    invalid = true;
                }
            }
            //don't need to check spec anti req since this is the first spec
            //check unit anti req
            for(j = 0; j < specResp[i].UnitAntiReqs.length; j++) { 
                if(careerUnits.includes(specResp[i].UnitAntiReqs[j])) { 
                    invalid = true
                }
            }
            if(intersection.length > maxLen && !invalid) { 
                maxLen = intersection.length;
                bestISpec = specResp[i]
            }
        }
        invalid = false;
    }
    console.log('best ispec step 3 is')
    console.log(bestISpec)
    return bestISpec
}



function findMajor(majorResp : any, careerUnits : string[]) { 
    let maxLen = 0;
    var bestMajor;
    for(var i = 0; i < majorResp.length; i++) { 
        let intersection = majorResp[i].Units.filter((item : any) => careerUnits.includes(item))
        if(intersection.length != 0) { 
            if(intersection.length > maxLen) { 
                maxLen = intersection.length;
                bestMajor = majorResp[i]
            }
        }
    }
    if(bestMajor === undefined) { 
        bestMajor = findRandMajor(majorResp)
    }
    return bestMajor;
}

export default function TopdownFilled() { 
    //console.log(props.match.params.id)
    const classes = useStyles();
    //const id = history.location.state as string;
    const [error, setErrorContent] = useState<string>();
    //const careers = useCareers();
    const majors = useMajors();
    const units = useUnits();
    const specs = useSpecializations();
    const [plan, setPlan] = useState<Plan>({})
    const temp = { ...plan}
    const specArr : Specialization[] = [];

    //con
    console.log('printing local storage item')
    const selectedCareerId = localStorage.getItem('careerSelect') as string;
    //const selectedCareerIdTest = JSON.parse(localStorage.getItem('careerSelect')!)
    //then, call useCareer to get the specific career
    console.log(selectedCareerId)
    const careers = useCareer(selectedCareerId)

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

    if(careers.isLoading || majors.isLoading || units.isLoading) { 
        return (<BounceLoader color="#1473AB" loading={true} size={150}/>)
    }

    let careerResponseData = careers.data?.data!;
    let majorResponseData = majors.data?.data!;
    let unitResponseData = units.data?.data!;
    let specResponseData = specs.data?.data!;




    if(!careerResponseData || !majorResponseData || !unitResponseData || !specResponseData) { 
        return <Error promptTitle="Request Error" promptContent={error as string} showPrompt={true} onAccept={() => backFunction() } />
    } else { 
        /* TODO: 
            * Check with all other careers manually to ensure above works as expected
            * what if no ispec match at all during steps 3/4 <-- pick a rand spec ? 
            * 
            * Test scenarios:
                * single major and that's all WORKS
                * double major  WORKS
                * major + 1ispec <-- clashing major anti req should NEVER make it through <-- for single anti req this seems to work, as the units will be removed from careerUnits, preventing it from matching  WORKS
                                *<-- also major spec containing OR WORKS
                    * i.e., major match will need to be the major anti req for the best ispec, forcing it to choose next best
                * major + 1ispec <-- clashing unit anti req should NEVER make it through pretty sure this works
                * major + 1ispec valid works
                * major + 1 valid ispec + ispec <-- clashing major anti req - double check logic is identical to ispec. if it is, it works
                * major + 1 valid ispec + ispec <-- clashing spec anti req - double check logic is identical to ispec. if it is, it works
                * major + valid ispec + ispec <-- clashing unit anti req - double check logic is identical to ispec. if it is, it works
                * major + 1 valid ispec + espec <-- clashing major anti req espec is same logic as ispec
                * major + 1 valid ispec + espec <-- clashing spec anti req espec is same logic as ispec
                * major + 1 valid ispec + espec <-- clashing unit anti req espec is same logic as ispec
                * 
                * 
                * 
                * major + 1 valid ispec + electives <-- elective pre reqs contain AND with OR, valid
                * major + 1 valid ispec + electives <-- elective pre reqs contain AND, valid
                * major + 1 valid ispec + electvies <-- elective pre reqs contain OR, valid
                * major + 1 valid ispec + electives <-- above, with the old unit codes, valid
                * major + 1 valid ispec + electives <-- elective pre reqs sum to > 24
                * 
        */


        /* 
        (1) look at main majors, check if any units are in them decide the best one. If we match all career units, stop here. Otherwise, try (2)
        ->
        (2) look at second majors, check if any units in them combine to make the career. If we can finish ALL the remaining career units with second major stop here. Otherwise, try (3)
        ->
        (3) look at ispecs, check if any units in them contain the units in my career select the best one. If we can finish all the remaining career units with this ISpec, stop here. Otherwise, try (4)
        ->
        (4) look at especs and/or ispecs. If we match all career units, stop here. Otherwise, pick a random spec and try fill the remaining career units with elective slots in (5)
        ->
        (5) Use elective slots to fill out career units and its pre requisites. If the remainder units AND pre reqs can be satisfied within 4 units, we have completed the plan. Otherwise, it's not possible to reach.
         */
        
        var allUnits : string[] = [];
        //Add the common units to the plan since all students must do these units
        for(var i = 0; i < commonUnits.length; i++) { 
            allUnits.push(commonUnits[i])
        }
        var solved = false;



        console.log('AT START : unit response data is: ')
        console.log(unitResponseData)
        
        console.log('career units for testing: ')
        //hardcoding for now to test =)
        var careerUnits = ["BIOL3011","HUMB2014","GENE3000","GENE3002","MEDI2010", "HUMB3008", "MEDI2000"]
        //var careerUnits = ["BIOL3011"]
        console.log(careerUnits)
        var doubleMajorFound = true;
        var bestMajor = findMajor(majorResponseData, careerUnits)

        var optionalUnits : Unit[] = [];
        console.log('out side of findMajor. result is: ')
        console.log(bestMajor)
            var secondBestMajor;

            console.log('career units before')
            console.log(careerUnits)
            updateCareerUnits(bestMajor, careerUnits)
            console.log('career units after')
            console.log(careerUnits)
            console.log('all units before')
            console.log(allUnits)
            updatePlanUnits(allUnits, bestMajor)
            console.log('all units after')
            console.log(allUnits)
            plan.mainMajor = bestMajor
            if(careerUnits.length === 0) { 
                console.log(allUnits)
                //alert('done on single major')
                console.log('Finished on a single major, stop here.')
                solved = true;
            } else {  //repeat and try find double major
                console.log('Attemping double major')
                secondBestMajor = findMajor(majorResponseData, careerUnits)
                
                //if true, we have perfectly matched all career units with 2 majors.
                if(areRemainingMatched(secondBestMajor, careerUnits)) { 
                    console.log('Finished on double major, stop here.')
                    updatePlanUnits(allUnits, secondBestMajor)
                    plan.doubleMajor = secondBestMajor
                    solved = true;
                } else { 
                    console.log('Double major will not work. Continue')
                    doubleMajorFound = false;
                }
            }
        if(!doubleMajorFound && !solved){
            var bestISpec;
            console.log(allUnits)
            console.log('in step 3: find best ispec')
            bestISpec = findISpec(specResponseData, careerUnits, bestMajor.MajorCode) //get major code from FIRST major (IGNORE SEOCND)
            if(bestISpec === undefined) {
                bestISpec = findRandISpec(specResponseData)
            }
            console.log('before')
            console.log(allUnits)
            console.log(careerUnits)
            updatePlanUnits(allUnits, bestISpec)
            updateCareerUnits(bestISpec, careerUnits)
            console.log('after')
            console.log(allUnits)
            console.log(careerUnits)
            //plan.specializations = bestISpec
            specArr.push(bestISpec)
            if(careerUnits.length === 0) { 
                //alert('finished at step 3')
                console.log('finished at step 3')
                plan.specializations = specArr;
                solved = true;
            } else { 
                //step 4 (find espec or ispec)
                console.log('Starting step 4')
                var bestISpecEspec;
                bestISpecEspec = findBestISpecESpec(specResponseData, careerUnits, bestMajor.MajorCode, bestISpec.SpecializationCode)
                console.log(bestISpecEspec)
                if(bestISpecEspec === undefined) { 
                    console.log('no suitable spec was found, i.e., returned undefined')
                    bestISpecEspec = findRandISpecESpec(specResponseData, bestISpec.SpecializationCode, bestMajor.MajorCode, careerUnits)
                    console.log(bestISpecEspec)
                }
                console.log('before')
                console.log(allUnits)
                console.log(careerUnits)
                if(areRemainingMatched(bestISpecEspec, careerUnits)) { 
                    solved = true;
                    specArr.push(bestISpecEspec)
                    console.log('finished at step 4')
                    updatePlanUnits(allUnits, bestISpecEspec)
                    plan.specializations = specArr;
                    console.log(allUnits)
                } else { 
                    if(!solved) {
                        plan.specializations = specArr;
                        console.log('Find electives, step 5')
                        console.log('All units and career units before')
                        console.log(allUnits)
                        console.log(careerUnits)
                        //var optionalUnits : Unit[] = [];
                        optionalUnits = getPreReqs(unitResponseData, careerUnits, allUnits);
                        console.log('All units and career untis after')
                        console.log(allUnits, careerUnits)
                        console.log('optionalUnits inside !solved = ')
                        console.log(optionalUnits)
                        if(optionalUnits.length <= 4) {
                            console.log('great success hahaghagsfh')
                            //optionalUnit
                            console.log('inside great success')
                            console.log(optionalUnits)
                            plan.optionalUnits = optionalUnits;
                            solved = true;
                        }
                    }
                   
                }
            }
        }
        if(solved) { 
            console.log('load into local storage, pass to bottom up')
            console.log(plan);
            console.log('inside setItem')
            console.log(optionalUnits)
            plan.optionalUnits = optionalUnits;
        } else { 
            alert('career cannot be met')
        }
        //    "courseplanner-plan": "{\"mainMajor\":{\"Credits\":200,\"MajorCode\":\"MJRU-MOLGN\",\"UnitAntiReqs\":[[\"\"]],\"SpecAntiReqs\":[[\"SPUC-HUMGN\"]],\"Units\":[\"BIOL3011\",\"GENE3000\",\"MEDI2010\",\"GENE2001\",\"BIOL3010\",\"BCCB2000\",\"GENE3002\",\"BIOL2001\"],\"Description\":\"Molecular Genetics is a rapidly advancing and exciting discipline for the 21st century. In this major, students will learn about universal principles and new advances in genetics and genomics, and how these can be applied to improve health outcomes. Areas of study will include molecular biology, human genetic disease, bioinformatics and genetic engineering. Students will also be introduced to cutting-edge technology for molecular and genetic analyses. Through a combination of theoretical and practical laboratory training, students will acquire a thorough understanding of molecular genetics and also develop skills in critical thinking and scientific communication. This course will prepare students for a career or further study in the biomedical sciences. \",\"Name\":\"molecular genetics\"}}",
        //    "courseplanner-plan": "{\"mainMajor\":{\"Credits\":200,\"MajorCode\":\"MJRU-MOLGN\",\"UnitAntiReqs\":[[\"\"]],\"SpecAntiReqs\":[[\"SPUC-HUMGN\"]],\"Units\":[\"BIOL3011\",\"GENE3000\",\"MEDI2010\",\"GENE2001\",\"BIOL3010\",\"BCCB2000\",\"GENE3002\",\"BIOL2001\"],\"Description\":\"Molecular Genetics is a rapidly advancing and exciting discipline for the 21st century. In this major, students will learn about universal principles and new advances in genetics and genomics, and how these can be applied to improve health outcomes. Areas of study will include molecular biology, human genetic disease, bioinformatics and genetic engineering. Students will also be introduced to cutting-edge technology for molecular and genetic analyses. Through a combination of theoretical and practical laboratory training, students will acquire a thorough understanding of molecular genetics and also develop skills in critical thinking and scientific communication. This course will prepare students for a career or further study in the biomedical sciences. \",\"Name\":\"molecular genetics\"}}",

          return (
    <Box> {/* Horrible Javascript Abuse TODO: Rework this */}
        <>
            <UnitsFirstSPAContext careers={careers.data?.data!} majors={majors.data?.data!.sort((a, b) => a.Name.localeCompare(b.Name))!} units={units.data?.data!.sort((a, b) => a.Name.localeCompare(b.Name))!} specs={specs.data?.data!.sort((a, b) => a.Name.localeCompare(b.Name))!} />
        </>
    </Box>
          )}
        /*return ( 
            <>
                <Navbar />
                <Grid container 
                    className={classes.nonNavBar} 
                    justify={'space-between'}
                    alignItems={'stretch'}
                >
                    <Grid item xs={2}>
                        <CurrentPlan 
                            majorCode={majorResponseData[0].MajorCode}
                            majorUnits={majorResponseData[0].Units}
                            majorName={majorResponseData[0].Name}
                        />
                    </Grid>
                    <Grid item xs={8} className={classes.test}>
                        <TopDownFilledMain />
                    </Grid>

                    <Grid item xs={2}>
                        <AvailableCareersList careerObj={ careerResponseData } />
                    </Grid>
                </Grid>
                <p>l</p>
            </>
        )*/

    }
