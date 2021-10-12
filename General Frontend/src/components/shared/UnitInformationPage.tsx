import { Box, Container, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { DefaultProps } from "../../types";
import { useUnit } from "../../api/hooks";
import { BounceLoader } from "react-spinners";
import NotFound from "../../pages/NotFound";

function ViewUnit(props: DefaultProps) {
    const { id } = useParams<{ id: string }>();
    const unit = useUnit(id)
    return (
        <Container className={props.className}>
            {unit.isLoading ? <BounceLoader color="#1473AB" loading={true} size={150} />
                : <>
                    {unit.isError ? <NotFound />
                        : <Box className="content" mt={4}>
                            <Typography align="center" style={{ textTransform: 'capitalize' }} variant="h3" component="h1">{`${unit.data?.data[0].Name} - ${unit.data?.data[0].UnitCode}`}</Typography>
                            <Box mt={2}>
                                <Typography style={{ textTransform: 'capitalize' }} variant="subtitle1" component="h2">{`${unit.data?.data[0].Name} - ${unit.data?.data[0].Description}`}</Typography>
                            </Box>
                            <Typography><span className="bold">Delivery:</span> {unit.data?.data[0].Delivery}</Typography>
                            <Typography><span className="bold">Semesters:</span> {unit.data?.data[0].Semester === 12 ? "1 and 2" : unit.data?.data[0].Semester}</Typography>
                            <span className="bold">Prerequisites:</span>
                            {unit.data?.data[0].Prerequistes.map((path: string[], idx: number) => <Typography className="path">
                                {path.map((u, idx) =>
                                    <>{u} {idx < (path.length - 2) ? "AND " : ""}</>
                                )}
                                {idx < (unit.data?.data[0].Prerequistes.length - 1) ? " OR" : ""}
                            </Typography>)}
                            <span className="bold">Antirequisites:</span>
                            {unit.data?.data[0].Antirequistes.map((path: string[], idx: number) => <Typography className="path">
                                {path.map((u, idx) =>
                                    <>{u} {idx < (path.length - 2) ? "AND " : ""}</>
                                )}
                                {idx < (unit.data?.data[0].Antirequistes.length - 1) ? " OR" : ""}
                            </Typography>)}
                        </Box>}
                </>}
        </Container>
    )
}

export default styled(ViewUnit)`
.content {
    text-align: initial;
}
.bold {
    font-weight: 600;
}
`;