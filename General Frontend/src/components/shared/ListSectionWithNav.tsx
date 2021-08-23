import { Box, Button, Paper, Typography } from "@material-ui/core";
import { CareerProps, DataIdProps, ErrorProps, PromptData } from "../../types";
import styled from "styled-components";
import { useState } from "react";
import { useHistory } from "react-router-dom";

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 23/08/2021
 * Description: Component that returns a list section that allows each item to be clickable.
 */