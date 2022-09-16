import React from "react";

const Dashboard = () => {
  const logOut = (setToken) => {
    localStorage.removeItem("token");
  };
  return (
    <div>
      <h2>Dashboard</h2>
      <a href="http://localhost:3000/pages/Login">
        <button onClick={logOut}>Log out</button>
      </a>
    </div>
  );
};

export default Dashboard;
