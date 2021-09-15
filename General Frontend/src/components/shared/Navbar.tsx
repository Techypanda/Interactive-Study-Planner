import { AppBar, Toolbar, Typography, Box} from "@material-ui/core";
import { DefaultProps } from "../../types";
import styled from 'styled-components';
import CurtinLogo from "../../static/curtinlogo.png";
import { useState } from "react";

function Navbar(props: DefaultProps) {
    return (
        <>
          <AppBar position="static" className={props.className}>
            <Toolbar className="flexit" >
              <Box id="LogoSection">
                <img src={CurtinLogo} alt="curtin logo" />
              </Box>
              <Typography variant="h6">
	          <b>Medical Course Planner  </b>
              </Typography>
            </Toolbar>
          </AppBar>
        </>
    );
}

export default styled(Navbar)`
  height: 64px;
  background-color: #FFF !important;
  color: #000 !important;
  h6 {
    margin-left: 10px;
    font-weight: 400 !important;
  }
  .flexit {
    display: flex;
    justify-content: flex-start;
  }
  #LogoSection {
    margin-left: 0;
    position: relative;
    padding: 0;
    left: 0
    display: flex;
    justify-content: flex-start;
    align-items: left;
  }
  #LogoSection img {
    height: 50px;
    object-fit: fill;
  }
`;
