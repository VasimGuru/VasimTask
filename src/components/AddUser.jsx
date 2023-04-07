import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Useradded } from "./UserSlice";
import { useNavigate } from "react-router-dom";
const AddUser = () => {
  // const Users
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const User = useSelector((state) => state.users.users.length);

  const Handledata = (event) => {
    alert(`${name} ${email} ${mobile}`);
    event.preventDefault();
    Dispatch(
      Useradded({
        id: parseInt(User + 1),
        name,
        email,
        mobile
      })
    );
    Navigate("/");
  };
  return (
    <>
      <h1>Add user</h1>
      <form onSubmit={(e) => Handledata(e)}>
        <label htmlFor="">Name</label>:{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <br />
        <label htmlFor="">Email</label>:{" "}
        <input
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <br />
        <label htmlFor="">mobile</label>:{" "}
        <input
          type="text"
          value={mobile}
          onChange={(e) => setmobile(e.target.value)}
        />
        <br />
        <button>Submit</button>
      </form>
    </>
  );
};

export default AddUser;
