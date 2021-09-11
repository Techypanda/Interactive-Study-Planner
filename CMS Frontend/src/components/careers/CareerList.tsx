import { Box, Chip } from "@material-ui/core";
import styled from "styled-components";

function CareerList(props: CareerListProps) {
  return (
    <Box id='major-list'>
      {props.list.map((val, key) =>
        <Chip
          onDelete={() => props.remove(val)}
          label={val}
          key={key}
          color="primary"
        />
      )}
    </Box>
  )
}
export default styled(CareerList)`
`;