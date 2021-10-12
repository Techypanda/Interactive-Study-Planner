import { Box, Paper, Typography } from "@material-ui/core";
import styled from "styled-components";
import { CardPromptProps } from "../../types";

function CardPrompt(props: CardPromptProps) {
  return (
    <div className={props.className}>
      <Box display="flex" justifyContent="center">
        <Paper className="max-width cardprompt" onClick={props.onClick}>
          <Box p={3}>
            <Box mb={2}>
              <Typography variant="h6" component="h6">{props.title}</Typography>
            </Box>
            <img src={props.src} alt={props.alt} className="responsive-img" />
            <Typography variant="body1" align="center">
              {props.description}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </div>
  )
}
export default styled(CardPrompt)`
.max-width {
  max-width: 450px;
}
.cardprompt {
  cursor: pointer;
}
.cardprompt:hover {
  transform: scale(1.1);
}
.responsive-img {
  width: 100%;
  object-fit: contain;
  max-height: 200px;
}
`;