import React from "react";
import Form from "../../components/shared/Form/Form"; // Importing Form component for login form
import { useSelector } from "react-redux"; // Importing useSelector from react-redux for accessing state
import Spinner from "./../../components/shared/Spinner"; // Importing Spinner component for loading indicator

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth); // Accessing loading and error state from Redux store

  return (
    <>
      {error && <span>{alert(error)}</span>} {/* Displaying alert if error exists */}
      {loading ? (
        // Conditionally rendering Spinner component if loading state is true
        <Spinner />
      ) : (
        <div className="row g-0">
          {/* Column for image banner */}
          <div className="col-md-8 form-banner">
            <img src="./assets/images/banner1.jpg" alt="loginImage" /> {/* Image for login banner */}
          </div>
          {/* Column for login form */}
          <div className="col-md-4 form-container">
            <Form
              formTitle={"Login Page"} // Title for the login form
              submitBtn={"Login"} // Text for the submit button
              formType={"login"} // Type of form (login)
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
