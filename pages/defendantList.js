import Styles from "../styles/DefendantsList.module.scss";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { getDefendants } from "../services/defendantService";
import AddDefendant from "../components/AddDefendant";
import EditDefendant from "../components/EditDefendant";

const DefendantList = ({ initialDefendants, user }) => {
  const [defendantSearch, setDefendantSearch] = useState("");

  const [defendants, setDefendants] = useState(initialDefendants);

  const updateDefendant = (res) => {
    const newDefendants = [...defendants];
    const index = defendants.findIndex((defendant) => {
      return defendant.id === res.id;
    });
    newDefendants[index] = res;
    setDefendants(newDefendants);
  };

  const addDefendant = (def) => {
    setDefendants([...defendants, def]);
  };

  const filteredDefendantsList = defendants.filter((defendant) => {
    if (
      defendant.first_name
        .toLowerCase()
        .concat(" ", defendant.last_name.toLowerCase())
        .includes(defendantSearch.toLowerCase())
    ) {
      return defendant;
    }
  });

  // Make a reusable convert height function
  const convertInchesToFeet = (defendant) => {
    let feet = Math.floor(Number(defendant.height) / 12);
    let inches = defendant.height % 12;
    return (defendant.feet = feet), (defendant.inches = inches);
  };

  const convertDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const handleDelete = async (defendant) => {
    const res = await fetch(`http://localhost:3000/api/defendants`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(defendant),
    });
    const deletedDefendant = await res.json();
    const newDefendants = defendants.filter(
      (def) => def.id !== deletedDefendant.id,
    );
    setDefendants(newDefendants);
  };

  return (
    <div className={Styles.DefendantsListContainer}>
      {/* SearchBar Start */}
      <label htmlFor="defendantSearch">Defendant Search: </label>
      <input
        name="defendantSearch"
        type="search"
        placeholder="Search Name"
        onChange={(e) => {
          setDefendantSearch(e.target.value);
        }}
      ></input>
      {/* SearchBar End */}
      <AddDefendant addDefendant={addDefendant} userId={user.id} />

      <table className={Styles.defendantList}>
        {/* Table Head Start */}
        <thead className={Styles.defendantListHeader}>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Gender</th>
            <th>Race</th>
            <th>Reason</th>
            <th>Date Added</th>
            <th>Added By</th>
          </tr>
        </thead>
        {/* Table Head End */}

        {defendantSearch ? (
          <tbody className={Styles.defendantListBody}>
            {filteredDefendantsList.map((defendant) => {
              convertInchesToFeet(defendant);
              let createdAt = convertDate(defendant.createdAt);
              return (
                <tr className={Styles.defendantRow} key={defendant.id}>
                  <td>{defendant.first_name}</td>
                  <td>{defendant.last_name}</td>
                  <td>{defendant.dob}</td>
                  <td>{`${defendant.feet}' ${defendant.inches} "`}</td>
                  <td>{defendant.weight} Lbs</td>
                  <td>{defendant.gender}</td>
                  <td>{defendant.race}</td>
                  <td>{defendant.reason}</td>
                  <td>{createdAt}</td>
                  <td>{defendant.user.name}</td>

                  {/* Checks if user can make changes to defendant row */}
                  {user.id === defendant.userId ? (
                    <>
                      {/* Delete Defendant Button */}
                      <td>
                        <button onClick={() => handleDelete(defendant)}>
                          Delete
                        </button>
                      </td>
                      {/* Open Edit Form Button */}
                      <td>
                        <button
                          onClick={() => {
                            setEditFormData(defendant);
                            setShowEdit(true);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody className={Styles.defendantListBody}>
            {/* Full Defendants list Start */}
            {defendants.map((defendant) => {
              convertInchesToFeet(defendant);
              let createdAt = convertDate(defendant.createdAt);
              return (
                <tr className={Styles.defendantRow} key={defendant.id}>
                  <td>{defendant.first_name}</td>
                  <td>{defendant.last_name}</td>
                  <td>{defendant.dob}</td>
                  <td>{`${defendant.feet}' ${defendant.inches} "`}</td>
                  <td>{defendant.weight} Lbs</td>
                  <td>{defendant.gender}</td>
                  <td>{defendant.race}</td>
                  <td>{defendant.reason}</td>
                  <td>{createdAt}</td>
                  <td>{defendant.user.name}</td>

                  {/* Checks if user can make changes to defendant row */}
                  {user.id === defendant.userId ? (
                    <>
                      {/* Delete Defendant Button */}
                      <td>
                        <button onClick={() => handleDelete(defendant)}>
                          Delete
                        </button>
                      </td>
                      {/* Open Edit Form Button */}
                      <EditDefendant
                        defendant={defendant}
                        updateDefendant={updateDefendant}
                      />
                    </>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        )}
        {/* Full Defendants list End */}
      </table>
    </div>
  );
};

DefendantList.propTypes = {
  initialDefendants: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
};

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions,
  );
  const user = session?.user;
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const res = await getDefendants();
  const defendants = JSON.parse(JSON.stringify(res));
  return {
    props: { user, initialDefendants: defendants },
  };
};

export default DefendantList;
