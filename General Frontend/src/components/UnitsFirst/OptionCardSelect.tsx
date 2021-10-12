import { Card, CardHeader, CardMedia, CardContent, Typography } from "@material-ui/core";
import styled from "styled-components";
import { OptionCardProps } from "../../types";

function OptionCardSelect(props: OptionCardProps) {
  const styles = {
    height: "100%",
    ...props.style
  }
  return (
    <div className={props.className} style={styles} onClick={props.onClick}>
      <Card className="cardselection clickable">
        <CardHeader title={props.title} subheader={props.type} className="capit" />
        <CardMedia
          component="img"
          height="194"
          image="https://images.squarespace-cdn.com/content/v1/5e408d9d0b0aed2f2768b9aa/1585703579456-3UVMWL3XQM0XIIUHHQS8/faq-temp-img.png"
          alt="Major Card"
        />
        <CardContent>
          <Typography className="maxHeight">{props.description}</Typography>
        </CardContent>
      </Card>
    </div>
  )
}
export default styled(OptionCardSelect)`
.clickable {
  cursor: pointer;
}
.cardselection {
  width: 350px;
  height: 380px;
}
.maxHeight {
  max-height: 10px;
}
.capit {
  text-transform: capitalize;
}
`;