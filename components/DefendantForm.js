import React from "react";
import PropTypes from "prop-types";
import Styles from "../styles/DefendantForm.module.scss";

const DefendantForm = ({
  show,
  onClose,
  handleSubmit,
  handleChange,
  formData,
}) => {
  if (!show) {
    return null;
  }
  return (
    <div className={Styles.modal} onClick={onClose}>
      <div className={Styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className={Styles.modalBody}>
          <button onClick={onClose}>close</button>
          <label>
            First Name:
            <input
              type="text"
              name="first_name"
              onChange={handleChange}
              defaultValue={formData.first_name}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="last_name"
              onChange={handleChange}
              defaultValue={formData.last_name}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              defaultValue={formData.dob}
            />
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
              defaultValue={formData.feet}
            />
            <input
              type="number"
              name="inches"
              min={0}
              max={11}
              placeholder="Inches"
              onChange={handleChange}
              defaultValue={formData.inches}
            />
          </label>
          <label>
            Weight:
            <input
              type="number"
              name="weight"
              placeholder="Lbs"
              onChange={handleChange}
              defaultValue={formData.weight}
            />
          </label>
          <label>
            <p>Gender:</p>
            <label>
              Male:
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
            </label>
            <label>
              Female:
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
            </label>
            <label>
              Other:
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleChange}
              />
            </label>
          </label>
          <label>
            Race:
            <input
              type="text"
              name="race"
              onChange={handleChange}
              defaultValue={formData.race}
            />
          </label>
          <label>
            Reason:
            <input
              type="text"
              name="reason"
              onChange={handleChange}
              defaultValue={formData.reason}
            />
          </label>
          <input type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
};

DefendantForm.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  formData: PropTypes.object,
};

export default DefendantForm;
