import React, { useState, useEffect } from "react";  // React imports
import Header from "../../components/shared/Layout/Header";  // Custom Header component
import API from "./../../services/API";  // API service for making requests
import moment from "moment";  // Library for date formatting

const Analytics = () => {
  const [data, setData] = useState([]);  // State for storing blood group data
  const [inventoryData, setInventoryData] = useState([]);  // State for storing recent inventory data
  const colors = [  // Array of colors for styling
    "#884A39",
    "#C38154",
    "#FFC26F",
    "#4F709C",
    "#4942E4",
    "#0079FF",
    "#FF0060",
    "#22A699",
  ];

  // Function to fetch blood group data
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");  // Making GET request to fetch blood group data
      if (data?.success) {
        setData(data?.bloodGroupData);  // Updating state with fetched blood group data
      }
    } catch (error) {
      console.log(error);  // Logging any errors that occur during API call
    }
  };

  // Fetch blood group data on component mount
  useEffect(() => {
    getBloodGroupData();
  }, []);  // Empty dependency array ensures this effect runs only once

  // Function to fetch recent blood transaction records
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");  // Making GET request to fetch recent inventory data
      if (data?.success) {
        setInventoryData(data?.inventory);  // Updating state with fetched recent inventory data
        console.log(data);
      }
    } catch (error) {
      console.log(error);  // Logging any errors that occur during API call
    }
  };

  // Fetch recent blood transaction records on component mount
  useEffect(() => {
    getBloodRecords();
  }, []);  // Empty dependency array ensures this effect runs only once

  return (
    <>
      <Header />  {/* Rendering Header component */}
      <div className="d-flex flex-row flex-wrap">
        {data?.map((record, i) => (
          <div
            className="card m-2 p-1"
            key={i}
            style={{ width: "18rem", backgroundColor: `${colors[i]}` }}  // Setting card background color dynamically
          >
            <div className="card-body">
              <h1 className="card-title bg-light text-dark text-center mb-3">
                {record.bloodGroup}  {/* Displaying blood group */}
              </h1>
              <p className="card-text">
                Total In : <b>{record.totalIn}</b> (ML)  {/* Displaying total blood in */}
              </p>
              <p className="card-text">
                Total Out : <b>{record.totalOut}</b> (ML)  {/* Displaying total blood out */}
              </p>
            </div>
            <div className="card-footer text-light bg-dark text-center">
              Total Available : <b>{record.availabeBlood}</b> (ML)  {/* Displaying total available blood */}
            </div>
          </div>
        ))}
      </div>
      <div className="container my-3">
        <h1 className="my-3">Recent Blood Transactions</h1>
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
            {inventoryData?.map((record) => (
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
      </div>
    </>
  );
};

export default Analytics;
