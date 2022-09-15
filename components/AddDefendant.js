import React, { useState } from "react";
import PropTypes from "prop-types";
import DefendantForm from "./DefendantForm";

const AddDefendant = ({ userId, addDefendant }) => {
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
    const defendant = await fetch(`http://localhost:3000/api/defendants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const res = await defendant.json();
    setFormData({
      first_name: "",
      last_name: "",
      dob: "",
      feet: null,
      inches: null,
      weight: null,
      gender: "",
      race: "",
      reason: "",
      userId: "",
    });
    addDefendant(res);
    setShow(false);
  };

  return show ? (
    <DefendantForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      onClose={() => setShow(false)}
      formData={formData}
      show={show}
    />
  ) : (
    <button onClick={() => setShow(true)}>Add Defendant</button>
  );
};

AddDefendant.propTypes = {
  userId: PropTypes.string,
  addDefendant: PropTypes.func,
};

export default AddDefendant;
