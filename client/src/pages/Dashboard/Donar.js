import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";  // Importing Layout component
import API from "../../services/API";  // Importing API service
import moment from "moment";  // Importing moment.js for date formatting

const Donar = () => {
  const [data, setData] = useState([]);  // State for storing fetched data

  // Function to fetch donor records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/inventory/get-donars");  // Fetching donor records from API endpoint
      if (data?.success) {
        setData(data?.donars);  // Updating state with fetched donor data
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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.name || record.organisationName + " (ORG)"}</td>  {/* Displaying donor's name or organisation name */}
              <td>{record.email}</td>  {/* Displaying donor's email */}
              <td>{record.phone}</td>  {/* Displaying donor's phone number */}
              <td>
                {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}  {/* Formatting and displaying date using moment.js */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Donar;
