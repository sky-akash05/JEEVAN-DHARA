import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout"; // Importing Layout component for consistent page layout
import moment from "moment"; // Importing moment.js for date formatting
import API from "../../services/API"; // Importing API service to make HTTP requests

const DonarList = () => {
  const [data, setData] = useState([]); // State to store donor data

  // Function to fetch donor records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/admin/donar-list"); // API request to fetch donor list
      if (data?.success) {
        setData(data?.donarData); // Set state with fetched donor data if request succeeds
      }
    } catch (error) {
      console.log(error); // Log error if API request fails
    }
  };

  // useEffect hook to fetch donor data when component mounts
  useEffect(() => {
    getDonars();
  }, []);

  // Function to handle deletion of a donor record
  const handelDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are You Sure Want To Delete This Donor?",
        "Sure"
      ); // Confirmation prompt before deletion
      if (!answer) return; // If user cancels prompt, exit function

      const { data } = await API.delete(`/admin/delete-donar/${id}`); // API request to delete donor record
      alert(data?.message); // Alert user with deletion message
      window.location.reload(); // Reload the page to reflect updated donor list
    } catch (error) {
      console.log(error); // Log error if deletion fails
    }
  };

  return (
    <Layout> {/* Rendering Layout component for consistent page structure */}
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
              {/* Displaying donor/organization details */}
              <td>{record.name || record.organisationName + " (ORG)"}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                {/* Delete button with onClick handler to call handelDelete function */}
                <button
                  className="btn btn-danger"
                  onClick={() => handelDelete(record._id)}
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

export default DonarList;
