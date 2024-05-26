// components/UserList.js

"use client";
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
}
const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  useEffect(() => {
    // Fetch the list of users from the API route
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoader(true);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {loader ? (
        " Loading"
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
