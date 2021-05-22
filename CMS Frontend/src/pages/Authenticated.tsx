import { Box, Typography } from "@material-ui/core";
import { DefaultProps } from "../types";

export default function Authenticated(props: DefaultProps) {
  return (
    <Box id="authenticated">
      <Typography variant="h2">Authenticated</Typography>
    </Box>
  )
}