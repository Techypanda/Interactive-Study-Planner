import { Box, Chip } from "@material-ui/core";
import styled from "styled-components";

function DeliveryList(props: DeliveryListProps) {
  return (
    <Box id='delivery-list'>
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
export default styled(DeliveryList)`
`;