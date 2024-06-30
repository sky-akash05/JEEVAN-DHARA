import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout"; // Importing Layout component
import moment from "moment"; // Importing moment.js for date formatting
import { useSelector } from "react-redux"; // Importing useSelector from react-redux for accessing state
import API from "../../services/API"; // Importing API service

const OrganisationPage = () => {
  const { user } = useSelector((state) => state.auth); // Accessing user data from Redux store
  const [data, setData] = useState([]); // State for storing organisation records

  // Function to fetch organisation records based on user role
  const getOrg = async () => {
    try {
      if (user?.role === "donar") {
        const { data } = await API.get("/inventory/get-organisation"); // Fetching organisations for donors
        if (data?.success) {
          setData(data?.organisations); // Updating state with fetched organisations
        }
      }
      if (user?.role === "hospital") {
        const { data } = await API.get("/inventory/get-organisation-for-hospital"); // Fetching organisations for hospitals
        if (data?.success) {
          setData(data?.organisations); // Updating state with fetched organisations
        }
      }
    } catch (error) {
      console.log(error); // Logging errors to console
    }
  };

  useEffect(() => {
    getOrg(); // Fetching organisation records on component mount or when user changes
  }, [user]); // Dependency array ensures useEffect runs when user changes

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
              <td>{record.organisationName}</td> {/* Displaying organisation name */}
              <td>{record.email}</td> {/* Displaying organisation email */}
              <td>{record.phone}</td> {/* Displaying organisation phone number */}
              <td>{record.address}</td> {/* Displaying organisation address */}
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

export default OrganisationPage;
