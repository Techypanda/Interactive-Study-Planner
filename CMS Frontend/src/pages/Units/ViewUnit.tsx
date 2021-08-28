import { LinearProgress, Typography } from "@material-ui/core";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useUnit } from "../../api/hooks";
import Error from "../../components/shared/Error";
import UnitDisplay from "../../components/units/UnitDisplay";
import { DefaultProps, Unit } from "../../types";
import NotFound from "../NotFound";

function ViewUnit(props: DefaultProps) {
  const { UnitCode } = useParams<{ UnitCode: string }>();
  const unit = useUnit(UnitCode)
  return (
    <>
      {unit.isLoading
      ? <LinearProgress />
      : <>
        {unit.isError
        ? <NotFound />
        : <UnitDisplay unit={((unit.data?.data!) as unknown as Array<Unit>)[0]} /> }
      </>}
    </>
  )
}
export default styled(ViewUnit)`
`;