import { Box, Button, Paper, Typography } from "@material-ui/core";
import Navbar from "../components/shared/Navbar";
import TextSection from "../components/shared/TextSection"
import { CareerProps, DataIdProps, ErrorProps, PromptData } from "../types";
import styled from "styled-components";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import Error from "../components/shared/Error";
import { BounceLoader } from "react-spinners";

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 22/08/2021
 * Description: Component that returns a list section that allows each item to be clickable.
 */