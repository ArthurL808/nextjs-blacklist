import React, { useState } from "react";
import PropTypes from "prop-types";
import BountyForm from "./BountyForm";

const AddBounty = ({ userId }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    feet: null,
    inches: null,
    weight: null,
    gender: "",
    race: "",
    reason: "",
    userId: userId,
    rewardAmount: 0,
    caseNumber: "",
    lastKnownLocation: "",
    note: "",
  });

  const convertFeetToInches = (data) => {
    const height = Number(data.feet) * 12 + Number(data.inches);
    delete data.feet;
    delete data.inches;
    data.height = height;
    return data;
  };

  const handleChange = (e) => {
    e.target.type === "number"
      ? setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) })
      : setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    convertFeetToInches(formData);
    console.log(formData);
    const bounty = await fetch(`http://localhost:3000/api/bounties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const res = await bounty.json();
    console.log(res);
  };

  return show ? (
    <BountyForm
      formData={formData}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      onClose={() => setShow(false)}
      show={show}
    />
  ) : (
    <button onClick={() => setShow(true)}>Add Bounty</button>
  );
};

AddBounty.propTypes = {
  userId: PropTypes.string,
};

export default AddBounty;
