import { AppBar, Toolbar, Typography, Box } from "@material-ui/core";
import { DefaultProps } from "../../types";
import styled from 'styled-components';
import CurtinLogo from "../../static/curtinlogo.png";
import { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import Landing from "../../pages/Landing";

function Navbar(props: DefaultProps) {
    const history = useHistory();
    return (
	<>
	    <AppBar position="static" className={props.className} elevation={0}>
		<Toolbar className="flexit borderbottom">
		    <Box id="LogoSection" mr={2}>
			<img src={CurtinLogo} alt="curtin logo" />
		    </Box>
		    <Typography variant="h6" onClick={() => history.push('/')}>
			Medical Course Planner
		    </Typography>
		    <Box id="spacer:)" display="flex" flexGrow={1} />
		    <a href="https://www.curtin.edu.au/" className="hiddenonmobile">
			<Typography variant="subtitle1" className="copyrighttext">Copyright &copy; 2020 - Curtin University (MIT)</Typography>
		    </a>
		</Toolbar>
	    </AppBar>
	</>
);
}

export default styled(Navbar)`
  height: 64px;
  background-color: #FFF !important;
  color: #000 !important;
  .borderbottom {
    border-bottom: 2px solid #cc9900;
  }
  h6 {
    margin-left: 10px;
    font-weight: 400 !important;
  }
  h6:hover {
    text-decoration: underline;
  }
  .flexit {
    display: flex;
    justify-content: flex-start;
  }
  #LogoSection {
    align-items: center;
  }
  #LogoSection img {
    height: 50px;
    object-fit: fill;
  }
  @media (max-width: 1000px) {
    #LogoSection img {
      height: 20px;
      object-fit: contain;
    }
  }
  @media (max-width: 721px) {
    .hiddenonmobile {
      display: none !important;
    }
  }
  .copyrighttext {
    color: #3285b6 !important;
  }
  a {
    text-decoration: none;
  }
`;
