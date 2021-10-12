/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRemainingHeight } from "../../api/hooks";
import { DefaultProps } from "../../types";

const useStyles = makeStyles((theme) => ({
  classList: {
    "border-right": "2px solid #cc9900",
  },
}));

export default function EmptyCurrentPlan(props: DefaultProps) {
  const classes = useStyles();
  const height = useRemainingHeight();
  return (
    <div className={`${props.className} fh mh hr`}>
      <Box className={classes.classList} minHeight={height} height="100%">
        <Box pt={2}>
          <Typography variant="h5">Current Plan</Typography>
        </Box>
      </Box>
    </div>
  );
}