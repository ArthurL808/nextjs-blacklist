import React from "react";
import PropTypes from "prop-types";
import Styles from "../styles/DefendantForm.module.scss";

const BountyForm = ({
  formData,
  handleChange,
  show,
  onClose,
  handleSubmit,
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
          <label>
            Case Number:
            <input
              type="text"
              name="caseNumber"
              onChange={handleChange}
              defaultValue={formData.caseNumber}
            />
          </label>
          <label>
            Last Known Location:
            <input
              type="text"
              name="lastKnownLocation"
              onChange={handleChange}
              defaultValue={formData.lastKnownLocation}
            />
          </label>
          <label>
            Reward Amount:
            <input
              type="number"
              min={100}
              name="rewardAmount"
              onChange={handleChange}
              defaultValue={formData.rewardAmount}
            />
          </label>
          <label>
            Additional Notes:
            <textarea
              type="text"
              name="note"
              rows="4"
              onChange={handleChange}
              defaultValue={formData.note}
            />
          </label>
          <input type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
};

BountyForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  show: PropTypes.bool,
  handleSubmit: PropTypes.func,
};

export default BountyForm;
