import { AppBar, Toolbar, IconButton, Typography, Box } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { DefaultProps } from "../../types";
import styled from 'styled-components';
import CurtinLogo from "../../static/curtinlogo.png";

function Navbar(props: DefaultProps) {
  return (
    <AppBar position="static" className={props.className}>
      <Toolbar className="flexit">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Typography variant="h6">
          Curtin Course Planner - Medical Content Management System
        </Typography>
        <Box id="LogoSection">
          <Typography variant="subtitle1">{ props.username }</Typography>
          <img src={CurtinLogo} alt="curtin logo" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default styled(Navbar)`
  height: 64px;
  background-color: #FFF !important;
  color: #000 !important;
  h6 {
    margin-left: 20px;
    font-weight: 400 !important;
  }
  .flexit {
    display: flex;
  }
  #LogoSection {
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #LogoSection h6 {
    display: inline;
    margin-right: 20px;
  }
  #LogoSection img {
    height: 50px;
    object-fit: contain;
  }
  @media (max-width: 1000px) {
    h6 {
      font-size: 15px;
      margin-right: 0;
    }
    #LogoSection img {
      height: 20px;
      object-fit: contain;
    }
  }
  @media (max-width: 750px) {
    h6 {
      font-size: 15px;
      margin-right: 0;
    }
    #LogoSection img {
      display: none;
    }
  }
  @media (max-width: 620px) {
    h6 {
      display: none;
    }
    #LogoSection h6 {
      display: inline;
    }
  }
`;