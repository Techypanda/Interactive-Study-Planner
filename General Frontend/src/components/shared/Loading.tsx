import React from 'react';
import { Box, Typography } from "@material-ui/core";
import Navbar from "./Navbar";

// plays animation and text for when the data is being retrieved should it be that slow
function LoadingScreen() {
    return (
        <>
          <Navbar/>
          <Box>
            <Typography variant="h2"> Retrieving data </Typography>
          </Box>
        </>
    );
}

export default LoadingScreen;
