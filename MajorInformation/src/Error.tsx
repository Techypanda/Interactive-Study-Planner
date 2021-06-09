import { Box, Dialog, Typography, Button } from "@material-ui/core";
import styled from "styled-components";
import { ErrorProps } from "../../types";

function Error(props: ErrorProps) {

  return (
    <Dialog className={props.className} onClose={() => props.onAccept()} aria-labelledby="error" open={props.showPrompt}>
      <Box p={3}>
        <Typography variant="h4" color="error">{props.promptTitle}</Typography>
        <Typography variant="body1">Reason: {props.promptContent}</Typography>
        <Button onClick={() => props.onAccept()}>Ok</Button>
      </Box>
    </Dialog>
  )
}

export default styled(Error)`
`;