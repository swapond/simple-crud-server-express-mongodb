import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

function Users() {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);
  const handleDelete = (_id) => {
    console.log(_id);
    fetch(`http://localhost:3000/users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("deleted successfully");

          const currentUsers = users.filter((user) => user._id != _id);
          setUsers(currentUsers);
        }
      });
  };
  return (
    <div>
      <div>Users: {users.length}</div>
      {users.map((user) => (
        <li key={user._id}>
          {user.name} : {user.email}
          <Link to={`/update/${user._id}`}>
            <button>Update</button>
          </Link>
          <button onClick={() => handleDelete(user._id)}>X</button>
        </li>
      ))}
    </div>
  );
}

export default Users;
