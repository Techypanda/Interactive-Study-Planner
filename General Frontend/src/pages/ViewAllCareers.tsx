import { Container } from "@material-ui/core";
import { DefaultProps } from "../types";
import CareersDatatable from "../components/shared/CareersDatatable"
import { BounceLoader } from "react-spinners";
import { useCareers } from '../api/hooks';

function ViewAllCareers(props: DefaultProps) {
	const careers = useCareers();
	return (
		<>
			<br />
			<Container  >
				{!careers.isLoading ? <CareersDatatable items={careers.data?.data} /> : <BounceLoader color="#1473AB" loading={true} size={150} />}
			</Container>
			<br />
		</>
	);
}

export default ViewAllCareers;
