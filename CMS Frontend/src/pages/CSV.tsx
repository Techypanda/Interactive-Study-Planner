import { Box, Button, CircularProgress, Container, Typography } from "@material-ui/core";
import { LocalShipping } from "@material-ui/icons";
import axios, { AxiosError } from "axios";
import { createRef, useState } from "react";
import { useQueryClient } from "react-query";
import styled from "styled-components"

function CSV(props: DefaultProps) {
  const csvFile = createRef<HTMLInputElement>()
  const client = useQueryClient()
  const [loading, setLoading] = useState(false);
  function handlePDFUpload(e: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    if (e.target.files) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        if (reader.result !== "") {
          const csvData = btoa(unescape(encodeURIComponent(reader.result as string)))
          axios.post(`${process.env.REACT_APP_CSV_API}/add`, JSON.stringify({
            csvData: csvData
          }), {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${client.getQueryData("token")}`
            }
          }).then((resp) => {
            alert(resp.data)
          }).catch((err) => {
            alert((err as AxiosError).response?.data)
          }).finally(() => {
            setLoading(false);
          })
        } else {
          alert("CSV File is empty")
          setLoading(false);
        }
      }
      reader.onerror = (err) => {
        alert(err)
      }
    }
  }

  return (
    <Box className={props.className} position="absolute" top={0} left={0} justifyContent="center" alignItems="center" minHeight="100vh" display="flex" minWidth="100vw" zIndex={-1}>
      <Container>
        {!loading ? <Box>
          <Typography align="center" variant="h4">Hi, Please Upload The CSV below and we will validate and perform the operation/s</Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" color="primary" onClick={() => csvFile?.current?.click()}>
              Upload <LocalShipping className="ml" />
            </Button>
            <input type="file" id="file" ref={csvFile} style={{ display: 'none' }} onChange={handlePDFUpload} />
          </Box>
        </Box> : <Box display="flex" justifyContent="center">
          <CircularProgress size={150} />
        </Box> }
      </Container>
    </Box>
  )
}
export default styled(CSV)`
.ml {
  margin-left: 10px;
}
`;