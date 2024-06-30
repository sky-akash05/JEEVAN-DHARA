import moment from "moment";   // Importing moment.js library for date formatting
import React, { useEffect, useState } from "react";  // React imports
import Layout from "../components/shared/Layout/Layout";  // Custom layout component
import API from "../services/API";  // Axios instance for API requests
import { useSelector } from "react-redux";  // Redux hook for accessing state

const Donation = () => {
  const { user } = useSelector((state) => state.auth);  // Accessing user data from Redux store
  const [data, setData] = useState([]);  // State to store donation records

  // Function to fetch donor records
  const getDonars = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "in",   // Filtering for incoming inventory
          donar: user?._id,      // Filtering by current user's ID
        },
      });
      if (data?.success) {
        setData(data?.inventory);  // Updating state with fetched data
        console.log(data);
      }
    } catch (error) {
      console.log(error);  // Logging any errors that occur during API call
    }
  };

  // Fetch donor records on component mount
  useEffect(() => {
    getDonars();
  }, []);  // Empty dependency array ensures this effect runs only once

  return (
    <Layout>  {/* Layout component wrapping the page content */}
      <div className="container mt-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Email</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (  // Mapping over data to render each donation record
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>  {/* Displaying blood group */}
                <td>{record.inventoryType}</td>  {/* Displaying inventory type */}
                <td>{record.quantity}</td>  {/* Displaying quantity */}
                <td>{record.email}</td>  {/* Displaying donor's email */}
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>  {/* Formatting and displaying date using moment.js */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Donation;
