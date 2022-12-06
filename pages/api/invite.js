import { Octokit } from "@octokit/rest";

export default async function handler(req, res) {
 if (req.method !== "POST") {
  return res.status(405).json({ message: "Method not allowed" });
 }
 const { email } = req.body;
 if (!email) return res.status(400).json({ message: "Email address is required!" });
 if (!email.includes("@")) return res.status(400).json({ message: "Please enter a valid email address!" });
 if (!email.includes(".")) return res.status(400).json({ message: "Please enter a valid email address!" });

 const client = new Octokit({
  auth: process.env.GITHUB_TOKEN,
 });

 await client.orgs
  .get({
   org: process.env.ORGANIZATION,
  })
  .then((data) => {
   if (data.status != 200) return res.status(404).json({ message: "Organization not found!" });
  })
  .catch((_) => {
   return res.status(500).json({ message: "Internal Server Error!" });
  });

 await client.orgs
  .createInvitation({
   org: process.env.ORGANIZATION,
   email,
   role: "direct_member",
  })
  .catch((_) => {
   const error = JSON.parse(JSON.stringify(_.response.data.errors[0].message));
   return res.status(400).json({ message: error });
  });

 return res.status(200).json({ message: "Invitation sent!" });
}
