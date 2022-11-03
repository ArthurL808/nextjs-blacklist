import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { addBounty } from "../../../services/bountyService";

export default async function handler(req, res) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      switch (req.method) {
        case "GET":

        case "POST":
          const bounty = await addBounty(req.body);
          return res.status(200).json(bounty);
        case "PUT":
          if (session.user.id !== req.body.userId) {
            return res.status(401).send("Unauthorized User");
          }
        case "DELETE":
          if (session.user.id !== req.body.userId) {
            return res.status(401).send("Unauthorized User");
          }
      }
    }
    return res.status(401).send("Unauthorized User");
  } catch (err) {
    console.error(err);
  }
}
