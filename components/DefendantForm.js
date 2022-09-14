import React from "react";
import PropTypes from "prop-types";

const DefendantForm = ({ setShow, handleSubmit, handleChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <button onClick={() => setShow(false)}>close</button>
      <label>
        First Name:
        <input type="text" name="first_name" onChange={handleChange} />
      </label>
      <label>
        Last Name:
        <input type="text" name="last_name" onChange={handleChange} />
      </label>
      <label>
        Date of Birth:
        <input type="date" name="dob" onChange={handleChange} />
      </label>
      <label>
        Height:
        <input
          type="number"
          name="feet"
          min={1}
          max={9}
          placeholder="Feet"
          onChange={handleChange}
        />
        <input
          type="number"
          name="inches"
          min={0}
          max={11}
          placeholder="Inches"
          onChange={handleChange}
        />
      </label>
      <label>
        Weight:
        <input
          type="number"
          name="weight"
          placeholder="Lbs"
          onChange={handleChange}
        />
      </label>
      <label>
        <p>Gender:</p>
        <label>
          Male:
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={handleChange}
          />
        </label>
        <label>
          Female:
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={handleChange}
          />
        </label>
        <label>
          Other:
          <input
            type="radio"
            name="gender"
            value="other"
            onChange={handleChange}
          />
        </label>
      </label>
      <label>
        Race:
        <input type="text" name="race" onChange={handleChange} />
      </label>
      <label>
        Reason:
        <input type="text" name="reason" onChange={handleChange} />
      </label>
      <input type="submit" value="submit" />
    </form>
  );
};

DefendantForm.propTypes = {
  setShow: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default DefendantForm;
