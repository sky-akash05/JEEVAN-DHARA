import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";  // Importing Layout component
import moment from "moment";  // Importing moment.js for date formatting
import API from "../../services/API";  // Importing API service
import { useSelector } from "react-redux";  // Importing useSelector hook from react-redux

const Consumer = () => {
  const { user } = useSelector((state) => state.auth);  // Accessing user information from Redux store
  const [data, setData] = useState([]);  // State for storing fetched data

  // Function to fetch donor records
  const getDonars = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "out",  // Filter by inventory type 'out'
          hospital: user?._id,   // Filter by current user's hospital ID
        },
      });
      if (data?.success) {
        setData(data?.inventory);  // Updating state with fetched inventory data
        console.log(data);  // Logging fetched data to console
      }
    } catch (error) {
      console.log(error);  // Logging errors to console
    }
  };

  useEffect(() => {
    getDonars();  // Fetching donor records on component mount
  }, []);  // Empty dependency array ensures this effect runs only once

  return (
    <Layout>  {/* Rendering Layout component */}
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
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>  {/* Displaying blood group */}
                <td>{record.inventoryType}</td>  {/* Displaying inventory type */}
                <td>{record.quantity}</td>  {/* Displaying quantity */}
                <td>{record.email}</td>  {/* Displaying donor's email */}
                <td>
                  {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}  {/* Formatting and displaying date using moment.js */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Consumer;
