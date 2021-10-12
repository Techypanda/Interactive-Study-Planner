import { Box, Button, Typography, useMediaQuery } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import { InitialCareerSPAProps } from "../../types";
import OptionCard from "./OptionCard";

// Viewport height - element.offset.top - desired bottom margin
function Initial(props: InitialCareerSPAProps) {
  const switchToOneCard = useMediaQuery('(max-width: 1500px)');
  const [currentSelection, setCurrentSelection] = useState(0);
  const navPrevious = () => {
    const prevIDX = currentSelection - 1 < 0 ? props.majors.length - 1 : currentSelection - 1;
    setCurrentSelection(prevIDX);
  }
  const navNext = () => {
    const nextIDX = currentSelection + 1 >= props.majors.length ? 0 : currentSelection + 1;
    setCurrentSelection(nextIDX);
  }
  const selectMajor = () => {
    props.selectMajor(props.majors[currentSelection])
  }
  return (
    <Box className={props.className} minHeight="100%" minWidth="100%" display="flex" alignItems="center" justifyContent="center">
      <Box pt={2}>
        <Typography variant="h4">Please Select Your First Major</Typography>
        <Box display="flex" justifyContent="center" mt={8}> {/* TODO: Make these slide around like pokemon starter selector */}
          {(props.majors.length >= 3 && !switchToOneCard) &&
            <OptionCard
              className="inner card-outer-left"
              style={{ transform: "translate(50px, -50px)" }}
              title="I'm a really cool blurred 3rd major"
              description="yep im bluured"
              type="Major"
            />
          }
          <OptionCard
            className="inner card-center"
            title={props.majors[currentSelection].Name}
            description={props.majors[currentSelection].Description}
            type="Major"
            onClick={() => selectMajor()}
          />
          {(props.majors.length >= 2 && !switchToOneCard) &&
            <OptionCard
              className="inner card-outer-right"
              style={{ transform: "translate(-50px, -50px)" }}
              title="I'm a really cool blurred 2nd major"
              description="yep im bluured"
              type="Major"
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
          {props.majors.map((_, idx) => <Box mx={1} key={idx} className={`navIndicator ${idx === currentSelection ? 'activewoopog' : ''}`} display="inline-block" height={15} width={15} borderRadius="100%" />)}
          <Box ml={2}>
            <NavigateNext className="navigationIcon" onClick={() => navNext()} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default styled(Initial)`
.inner {
  position: relative;
}
.navigationIcon {
  background-color: #cc9900 !important;
  color: #FFF !important;
  font-size: 50px !important;
  border-radius: 100%;
  padding: 5px;
  cursor: pointer;
}
.navIndicator {
  background-color: #d9d9d9;
  border: 2px solid #777777;
}
.activewoopog {
  background-color: #777777;
}
.card-outer-right {
  z-index: -1;
  filter: blur(4px);
}
.card.center {
  z-index: 0;
}
.card-outer-left {
  z-index: -1;
  filter: blur(4px);
}
`;