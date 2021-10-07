import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import FrontendRoutes from './FrontendRoutes';
import { BounceLoader } from "react-spinners";
// could just render the landing page from the index file but opportunities for other
// setup could be done here
function App() {
	return (

		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Suspense fallback={<BounceLoader color="#1473AB" loading={true} size={150} />}>
					<FrontendRoutes />
				</Suspense>
			</BrowserRouter>
		</div>
	);
}

export default App;
