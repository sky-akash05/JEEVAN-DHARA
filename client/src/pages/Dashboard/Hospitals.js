import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout"; // Importing Layout component
import API from "../../services/API"; // Importing API service
import moment from "moment"; // Importing moment.js for date formatting

const Hospitals = () => {
  const [data, setData] = useState([]); // State for storing fetched data

  // Function to fetch hospital records
  const getHospitals = async () => {
    try {
      const { data } = await API.get("/inventory/get-hospitals"); // Fetching hospital records from API endpoint
      if (data?.success) {
        setData(data?.hospitals); // Updating state with fetched hospital data
      }
    } catch (error) {
      console.log(error); // Logging errors to console
    }
  };

  useEffect(() => {
    getHospitals(); // Fetching hospital records on component mount
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <Layout> {/* Rendering Layout component */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.hospitalName}</td> {/* Displaying hospital name */}
              <td>{record.email}</td> {/* Displaying hospital email */}
              <td>{record.phone}</td> {/* Displaying hospital phone number */}
              <td>{record.address}</td> {/* Displaying hospital address */}
              <td>
                {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")} {/* Formatting and displaying date using moment.js */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Hospitals;
