import {BrowserRouter } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import FrontendRoutes from './FrontendRoutes';

// could just render the landing page from the index file but opportunities for other
// setup could be done here
function App() {
    return (
	<div className="App">
			<Navbar />
	    <BrowserRouter>
				<FrontendRoutes />
	    </BrowserRouter>
	</div>
    );
}

export default App;
