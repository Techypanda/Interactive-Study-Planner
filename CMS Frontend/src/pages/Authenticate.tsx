import { Box, Typography } from "@material-ui/core";
import axios, { AxiosError } from 'axios';
import 'cross-fetch/polyfill';
import { useEffect } from "react";
export default function Authenticate(props: DefaultProps) {
  useEffect(() => {
    console.log('loaded')
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.get('code')) {
      const url = `${process.env.REACT_APP_COGNITO_LOGIN_URI}/login?client_id=${process.env.REACT_APP_COGNITO_CLIENT_ID}&response_type=code&scope=email+openid+phone+profile&redirect_uri=${window.location.origin}`;
      console.log(url)
      window.location.replace(`${process.env.REACT_APP_COGNITO_LOGIN_URI}/login?client_id=${process.env.REACT_APP_COGNITO_CLIENT_ID}&response_type=code&scope=email+openid+phone+profile&redirect_uri=${window.location.origin}`);
    } else {
      const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('client_id', process.env.REACT_APP_COGNITO_CLIENT_ID!)
      params.append('code', urlParams.get('code')!);
      params.append('redirect_uri', window.location.origin);
      axios.post(`${process.env.REACT_APP_COGNITO_LOGIN_URI}/oauth2/token`, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then((resp) => {
        sessionStorage.setItem('rToken', resp.data['refresh_token']);
        sessionStorage.setItem('rTokenExpiry', new Date(new Date().getTime()+(30*24*60*60*1000)).toString()); // After 60 days the refresh token no longer works
        window.location.replace('/')
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 400) {
          if (err.response.data['error'] === 'invalid_grant') {
            window.location.replace(`${process.env.REACT_APP_COGNITO_LOGIN_URI}/login?client_id=${process.env.REACT_APP_COGNITO_CLIENT_ID}&response_type=code&scope=email+openid+phone+profile&redirect_uri=${window.location.origin}`);
          }
          console.error(err.response); // need to add a error screen
        }
        console.error(err.response); // need to add a error screen
      })
    }
  }, []);
  return (
    <Box id="authenticating">
      <Typography variant="h4">Sorry - This Site Requires A Staff Account!</Typography>
    </Box>
  )
}