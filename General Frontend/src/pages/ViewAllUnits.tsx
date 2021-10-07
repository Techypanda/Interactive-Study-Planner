import { Container } from "@material-ui/core";
import { DefaultProps } from "../types";
import UnitsDataTable from "../components/shared/UnitsDatatable"
import { BounceLoader } from "react-spinners";
import { useUnits } from '../api/hooks';

/* const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		details: {
			display: 'flex',
			flexDirection: 'column',
		},
		content: {
			flex: '1 0 auto',
		},
		cover: {
			width: 151,
		},
		controls: {
			display: 'flex',
			alignItems: 'right',
			paddingRight: theme.spacing(1),
			paddingBottom: theme.spacing(1),
		},
		playIcon: {
			height: 38,
			width: 38,
		},

	}),
); */


function ViewAllUnits(props: DefaultProps) {
	const base = [{ Credits: "", Antirequisites: "", Prerequisites: "", Delivery: "", UnitCode: "", Description: "", Corequisites: "", Name: "" }];
	const units = useUnits();

	return (
		<>
			<br />
			<Container>
				{units.isLoading ? <BounceLoader color="#1473AB" loading={true} size={150} /> : <UnitsDataTable items={units.data?.data} />}
			</Container>
			<br />

		</>
	);
}

export default ViewAllUnits;
