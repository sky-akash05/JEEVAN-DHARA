import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout"; // Importing Layout component for consistent page layout
import moment from "moment"; // Importing moment.js for date formatting
import API from "../../services/API"; // Importing API service to make HTTP requests

const OrgList = () => {
  const [data, setData] = useState([]); // State to store organization data

  // Function to fetch organization records
  const getOrganizations = async () => {
    try {
      const { data } = await API.get("/admin/org-list"); // API request to fetch organization list
      if (data?.success) {
        setData(data?.orgData); // Set state with fetched organization data if request succeeds
      }
    } catch (error) {
      console.log(error); // Log error if API request fails
    }
  };

  // useEffect hook to fetch organization data when component mounts
  useEffect(() => {
    getOrganizations();
  }, []);

  // Function to handle deletion of an organization record
  const handleDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this organization?",
        "Sure"
      ); // Confirmation prompt before deletion
      if (!answer) return; // If user cancels prompt, exit function

      const { data } = await API.delete(`/admin/delete-organization/${id}`); // API request to delete organization record
      alert(data?.message); // Alert user with deletion message
      window.location.reload(); // Reload the page to reflect updated organization list
    } catch (error) {
      console.log(error); // Log error if deletion fails
    }
  };

  return (
    <Layout>
      {" "}
      {/* Rendering Layout component for consistent page structure */}
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              {/* Displaying organization details */}
              <td>{record.organisationName}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                {/* Delete button with onClick handler to call handleDelete function */}
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(record._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default OrgList;
