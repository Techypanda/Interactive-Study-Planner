import { Box, Typography } from "@material-ui/core";
import { DefaultProps } from "../types";

export default function NotFound(props: DefaultProps) {
  return (
    <Box>
      <Typography variant="h2">Sorry, that page wasn't found</Typography>
    </Box>    
  )
}