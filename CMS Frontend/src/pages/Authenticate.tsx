import { Box, Typography } from "@material-ui/core";
import { DefaultProps } from "../types";

export default function Authenticate(props: DefaultProps) {
  return (
    <Box id="authenticating...">
      <Typography variant="h2">Hey G: {process.env.COGNITO_LOGIN_URI}</Typography>
    </Box>
  )
}