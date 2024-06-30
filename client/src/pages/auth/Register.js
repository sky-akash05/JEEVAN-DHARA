import React from "react";
import Form from "../../components/shared/Form/Form"; // Importing Form component for registration form
import { useSelector } from "react-redux"; // Importing useSelector from react-redux for accessing state
import Spinner from "../../components/shared/Spinner"; // Importing Spinner component for loading indicator

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth); // Accessing loading and error state from Redux store

  return (
    <>
      {error && <span>{alert(error)}</span>} {/* Displaying alert if error exists */}
      {loading ? ( 
        //{/* Conditionally rendering Spinner component if loading state is true */}
        <Spinner />
      ) : (
        <div className="row g-0">
          {/* Column for image banner */}
          <div className="col-md-8 form-banner">
            <img src="./assets/images/banner2.jpg" alt="registerImage" /> {/* Image for registration banner */}
          </div>
          {/* Column for registration form */}
          <div className="col-md-4 form-container">
            <Form
              formTitle={"Register"} // Title for the registration form
              submitBtn={"Register"} // Text for the submit button
              formType={"register"} // Type of form (register)
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
