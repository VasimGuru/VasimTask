import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const UserList = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = useSelector((state) => state.users.users);
  // console.log("hello", Users);

  function handleUserClick(user) {
    setSelectedUser(user);
  }
  return (
    <>
      <NavLink to="/adduser">
        <button> Add User</button>
      </NavLink>
      <h1>UserList</h1>
      <div className="left-sidebar">
        <h2>All Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.email} onClick={() => handleUserClick(user)}>
              {user.name} ({user.email}) - {user.country}
            </li>
          ))}
        </ul>
        <button>Add New User</button>
      </div>
      <div className="middle-screen">
        {selectedUser ? (
          <div>
            <h2>{selectedUser.name}</h2>
            <p>Email: {selectedUser.email}</p>
            <p>Country: {selectedUser.country}</p>
            <button onClick={() => window.open(selectedUser.pdfUrl)}>
              DOWNLOAD
            </button>
          </div>
        ) : (
          <p>Please select a user</p>
        )}
      </div>
    </>
  );
};

export default UserList;
