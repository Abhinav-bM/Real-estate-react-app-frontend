import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PropertyList from "./pages/PropertyList";
import CreateProperty  from "./pages/CreateProperty";
import PropertyDetails from "./pages/PropertyDetails";
import EditProperty from "./pages/EditProperty";
import { useSelector } from "react-redux";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={!isAuthenticated ?  <Register /> : <Navigate to="/" />} />
            <Route path="/properties/:id/edit" element={<EditProperty />} />
            <Route path="/createProperty" element = { <CreateProperty /> } />
            <Route path="/properties" element = { <PropertyList /> } />
            <Route path="/properties/:id" element={<PropertyDetails />} />
          </Routes>
        </Router>
    </>
  );
};

export default App;
