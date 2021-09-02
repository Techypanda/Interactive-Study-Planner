import { Box, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function NotFound(props: DefaultProps) {
  const history = useHistory();
  return (
    <Box>
      <Typography variant="h2">Sorry, that page wasn't found</Typography>
      <Button onClick={() => history.push('/')}>Return To Landing</Button>
    </Box>    
  )
}