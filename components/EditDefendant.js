import React, { useState } from "react";
import PropTypes from "prop-types";
import DefendantForm from "./DefendantForm";

const EditDefendant = ({ defendant, updateDefendant }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(defendant);

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
      method: "PUT",
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
    updateDefendant(res);
    setShow(false);
  };

  return show ? (
    <td>
      <DefendantForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        onClose={() => setShow(false)}
        show={show}
        formData={formData}
      />
    </td>
  ) : (
    <td>
      <button
        onClick={() => {
          setShow(true);
        }}
      >
        Edit
      </button>
    </td>
  );
};

EditDefendant.propTypes = {
  defendant: PropTypes.object,
  updateDefendant: PropTypes.func,
};

export default EditDefendant;
