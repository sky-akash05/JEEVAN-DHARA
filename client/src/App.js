import { Routes, Route } from "react-router-dom"; // Import necessary components from React Router
import HomePage from "./pages/HomePage"; // Import HomePage component
import Login from "./pages/auth/Login"; // Import Login component
import Register from "./pages/auth/Register"; // Import Register component
import { ToastContainer } from "react-toastify"; // Import ToastContainer component for notifications
import "react-toastify/dist/ReactToastify.css"; // Import CSS for ToastContainer
import ProtectedRoute from "./components/Routes/ProtectedRoute"; // Import ProtectedRoute component for authenticated routes
import PublicRoute from "./components/Routes/PublicRoute"; // Import PublicRoute component for unauthenticated routes
import Donar from "./pages/Dashboard/Donar"; // Import Donar component for donor dashboard
import Hospitals from "./pages/Dashboard/Hospitals"; // Import Hospitals component for hospital dashboard
import OrganisationPage from "./pages/Dashboard/OrganisationPage"; // Import OrganisationPage component for organisation dashboard
import Consumer from "./pages/Dashboard/Consumer"; // Import Consumer component for consumer dashboard
import Donation from "./pages/Donation"; // Import Donation component
import Analytics from "./pages/Dashboard/Analytics"; // Import Analytics component for dashboard analytics
import DonarList from "./pages/Admin/DonarList"; // Import DonarList component for admin dashboard
import HospitalList from "./pages/Admin/HospitalList"; // Import HospitalList component for admin dashboard
import OrgList from "./pages/Admin/OrgList"; // Import OrgList component for admin dashboard
import AdminHome from "./pages/Admin/AdminHome"; // Import AdminHome component for admin dashboard

function App() {
  return (
    <>
      <ToastContainer /> {/* Container for displaying toast notifications */}
      
      <Routes> {/* Root component for defining routes */}
        
        {/* Admin Dashboard Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute> {/* Protects route requiring authentication */}
              <AdminHome /> {/* Renders AdminHome component for admin dashboard */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/donar-list"
          element={
            <ProtectedRoute>
              <DonarList /> {/* Renders DonarList component for admin dashboard */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital-list"
          element={
            <ProtectedRoute>
              <HospitalList /> {/* Renders HospitalList component for admin dashboard */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/org-list"
          element={
            <ProtectedRoute>
              <OrgList /> {/* Renders OrgList component for admin dashboard */}
            </ProtectedRoute>
          }
        />

        {/* Dashboard Routes */}
        <Route
          path="/hospital"
          element={
            <ProtectedRoute>
              <Hospitals /> {/* Renders Hospitals component for hospital dashboard */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics /> {/* Renders Analytics component for dashboard analytics */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/consumer"
          element={
            <ProtectedRoute>
              <Consumer /> {/* Renders Consumer component for consumer dashboard */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/donation"
          element={
            <ProtectedRoute>
              <Donation /> {/* Renders Donation component */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/orgnaisation"
          element={
            <ProtectedRoute>
              <OrganisationPage /> {/* Renders OrganisationPage component for organisation dashboard */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/donar"
          element={
            <ProtectedRoute>
              <Donar /> {/* Renders Donar component for donor dashboard */}
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage /> {/* Renders HomePage component as default landing page */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login /> {/* Renders Login component for unauthenticated access */}
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register /> {/* Renders Register component for unauthenticated access */}
            </PublicRoute>
          }
        />
      
      </Routes> {/* End of Routes component */}
    </>
  );
}

export default App; // Export App component as the default export
