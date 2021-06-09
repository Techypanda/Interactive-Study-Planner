import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Book, FolderSpecial, Home, Menu, Report, Work } from "@material-ui/icons";
import { DefaultProps } from "../../types";
import styled from 'styled-components';
import CurtinLogo from "../../static/curtinlogo.png";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Navbar(props: DefaultProps) {
  const [sideNav, setSideNav] = useState(false);
  const history = useHistory();
  function nav(location: string) {
    setSideNav(false);
    history.push(location);
  }
  return (
    <>
      <AppBar position="static" className={props.className}>
        <Toolbar className="flexit">
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setSideNav(!sideNav)}>
            <Menu />
          </IconButton>
          <Typography variant="h6">
            Curtin Course Planner - Medical Content Management System
        </Typography>
          <Box id="LogoSection">
            <Typography variant="subtitle1">{props.username}</Typography>
            <img src={CurtinLogo} alt="curtin logo" />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={sideNav} onClose={() => setSideNav(false)}>
        <List>
          <Box width={225}>
            <ListItem button onClick={() => nav('/')}>
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Landing" />
            </ListItem>
          </Box>
          <Box width={225}>
            <ListItem button onClick={() => nav('/units')}>
              <ListItemIcon><Book /></ListItemIcon>
              <ListItemText primary="Manage Units" />
            </ListItem>
          </Box>
          <Box width={225}>
            <ListItem button onClick={() => nav('/careers')}>
              <ListItemIcon><Work /></ListItemIcon>
              <ListItemText primary="Manage Careers" />
            </ListItem>
          </Box>
          <Box width={225}>
            <ListItem button onClick={() => nav('/majors')}>
              <ListItemIcon><Report /></ListItemIcon>
              <ListItemText primary="Manage Majors" />
            </ListItem>
          </Box>
          <Box width={225}>
            <ListItem button onClick={() => nav('/specializations')}>
              <ListItemIcon><FolderSpecial /></ListItemIcon>
              <ListItemText primary="Manage Specializations" />
            </ListItem>
          </Box>
        </List>
      </Drawer>
    </>
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
  #test {
    display: none !important;
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