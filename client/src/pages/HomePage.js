import React, { useEffect, useState } from "react";  // React imports
import { useSelector } from "react-redux";  // Redux hook for accessing state
import { useNavigate } from "react-router-dom";  // Navigation hook for programmatic navigation
import Spinner from "../components/shared/Spinner";  // Custom spinner component
import Layout from "../components/shared/Layout/Layout";  // Custom layout component
import Modal from "../components/shared/modal/Modal";  // Custom modal component
import API from "../services/API";  // Axios instance for API requests
import moment from "moment";  // Library for date formatting

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);  // Selecting loading, error, and user data from Redux state
  const [data, setData] = useState([]);  // State to store blood records fetched from API
  const navigate = useNavigate();  // Hook for navigating programmatically

  // Function to fetch blood records from API
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("api/v1/inventory/get-inventory");  // Making GET request to fetch blood records
      if (data?.success) {
        setData(data?.inventory);  // Updating state with fetched blood records
      }
    } catch (error) {
      console.log(error);  // Logging any errors that occur during API call
    }
  };

  // Fetch blood records on component mount
  useEffect(() => {
    getBloodRecords();
  }, []);  // Empty dependency array ensures this effect runs only once

  return (
    <Layout>  {/* Layout component wrapping the page content */}
      {/* Redirect to admin page if user role is admin */}
      {user?.role === "admin" && navigate("/admin")}
      {/* Display error alert if error exists */}
      {error && <span>{alert(error)}</span>}
      {/* Display spinner while loading */}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container">
            {/* Button to trigger modal */}
            <h4
              className="ms-4"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-plus text-success py-4"></i>
              Add Inventory
            </h4>
            {/* Table to display blood records */}
            <table className="table ">
              <thead>
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventory Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Donor Email</th>
                  <th scope="col">Time & Date</th>
                </tr>
              </thead>
              <tbody>
                {/* Mapping over data to render each blood record */}
                {data?.map((record) => (
                  <tr key={record._id}>
                    <td>{record.bloodGroup}</td>  {/* Displaying blood group */}
                    <td>{record.inventoryType}</td>  {/* Displaying inventory type */}
                    <td>{record.quantity} (ML)</td>  {/* Displaying quantity */}
                    <td>{record.email}</td>  {/* Displaying donor's email */}
                    <td>
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}  {/* Formatting and displaying date using moment.js */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Modal />  {/* Rendering modal component */}
          </div>
        </>
      )}
    </Layout>
  );
};

export default HomePage;
