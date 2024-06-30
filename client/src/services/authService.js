import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

// Function to handle user login
export const handleLogin = (e, email, password, role) => {
  e.preventDefault(); // Prevent default form submission behavior
  try {
    // Validate if all required fields are provided
    if (!role || !email || !password) {
      return alert("Please Provide All Fields");
    }

    // Dispatch userLogin action with email, password, and role
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    console.log(error); // Log any errors that occur during dispatch
  }
};

// Function to handle user registration
export const handleRegister = (
  e,
  name,
  role,
  email,
  password,
  phone,
  organisationName,
  address,
  hospitalName,
  website
) => {
  e.preventDefault(); // Prevent default form submission behavior
  try {
    // Dispatch userRegister action with registration details
    store.dispatch(
      userRegister({
        name,
        role,
        email,
        password,
        phone,
        organisationName,
        address,
        hospitalName,
        website,
      })
    );
  } catch (error) {
    console.log(error); // Log any errors that occur during dispatch
  }
};
/*Explanation:
Importing Redux Actions and Store:

import { userLogin, userRegister } from "../redux/features/auth/authActions";: Imports action creators userLogin and userRegister from the Redux action file authActions.
import store from "../redux/store";: Imports the Redux store instance from store.js.


handleLogin Function:

handleLogin(e, email, password, role): Takes event object e, email, password, and role as parameters.
e.preventDefault();: Prevents the default form submission behavior.
Checks if role, email, and password are provided. If not, it alerts the user to provide all fields.
Dispatches the userLogin action with { email, password, role } payload to the Redux store.


handleRegister Function:

handleRegister(...args): Takes multiple parameters representing user registration details.
e.preventDefault();: Prevents the default form submission behavior.
Dispatches the userRegister action with an object containing all registration details as the payload ({ name, role, email, password, phone, organisationName, address, hospitalName, website }).



Error Handling:

Both functions are wrapped in a try-catch block to catch and log any errors that may occur during the dispatch of Redux actions (userLogin or userRegister).
Usage:
These functions are typically used as event handlers in React components (e.g., onClick for login/register buttons).
Ensure that the Redux actions (userLogin and userRegister) are correctly defined in authActions.js and are connected to reducers to update the Redux store state accordingly.
Proper validation and error handling should be implemented in the Redux actions and reducers to handle different scenarios (e.g., successful login/register, validation errors, API errors).
By using these functions, you can effectively manage user authentication and registration flo */
