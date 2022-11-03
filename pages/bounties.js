import React from "react";
import Styles from "../styles/Bounties.module.scss";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { getUsersBounties } from "../services/bountyService";
import PropTypes from "prop-types";
import AddBounty from "../components/AddBounty";
const Bounties = ({ usersBounties, user }) => {
  return (
    <div className={Styles.container}>
      <h1>Bounties</h1>
      <AddBounty userId={user.id} />
      {usersBounties.map((user) => {
        if (user.bounty.length <= 0) {
          return null;
        }
        return (
          <section key={user.id} className="usersBounties">
            <h1>{`${user.name}'s Bounties`}</h1>
            {user.bounty.map((bounty) => {
              return (
                <div key={bounty.id} className={Styles.bountyCard}>
                  <h3>{`Name: ${bounty.defendant.first_name} ${bounty.defendant.last_name}`}</h3>
                  <h4>Date of Birth:</h4>
                  <p>{bounty.defendant.dob}</p>
                  <h4>Gender:</h4>
                  <p>{bounty.defendant.gender}</p>
                  <h4>Race:</h4>
                  <p>{bounty.defendant.race}</p>
                  <h4>Height:</h4>
                  <p>{bounty.defendant.height}</p>
                  <h4>Weight:</h4>
                  <p>{bounty.defendant.weight} Lbs</p>
                  <h4>Case Number:</h4>
                  <p>{bounty.caseNumber}</p>
                  <h4>Last known Location:</h4>
                  <p>{bounty.lastKnownLocation}</p>
                  <h4>Reward:</h4>
                  <p>${bounty.rewardAmount}</p>
                  <h4>Additional Notes:</h4>
                  <p>{bounty.note}</p>
                  <h4>
                    Date Added:
                    <p>{bounty.createdAt}</p>
                  </h4>
                </div>
              );
            })}
          </section>
        );
      })}
    </div>
  );
};

Bounties.propTypes = {
  usersBounties: PropTypes.arrayOf(PropTypes.object),
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

  const res = await getUsersBounties();
  const usersBounties = JSON.parse(JSON.stringify(res));
  return {
    props: { usersBounties, user },
  };
};

export default Bounties;
