import { useState } from "react";
import { useLoaderData } from "react-router-dom";

function Update() {
  // Load user data from react-router-dom's useLoaderData
  const loadedUser = useLoaderData();

  // Define a state variable 'user' and a function 'setUser' to manage user data
  const [user, setUser] = useState(loadedUser);

  // Function to handle the update form submission
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    // Extract name and email values from the form
    const name = form.name.value;
    const email = form.email.value;
    console.log(name, email);

    // Create an object with updated user data
    const updateUser = { name, email };

    // Send a PUT request to update the user data on the server
    fetch(`http://localhost:3000/users/${loadedUser._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          console.log(data);
        }
        alert("Modification successfully!");

        // Update the local 'user' state with the new data
        setUser({ ...user, name: name, email: email });
      });
  };

  return (
    <div>
      {/* Display the user's name and email */}
      {user.name} : {user.email}
      {/* Create a form for updating user data */}
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" defaultValue={loadedUser?.name} />
        <br />
        <input type="text" name="email" defaultValue={loadedUser?.email} />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Update;
