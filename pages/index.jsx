import { Container } from "../components/Container";
import { useState } from "react";

import Link from "next/link";
export default function Home() {
 const [email, setEmail] = useState("");
 const [loading, setLoading] = useState(false);
 const [error, setErrorMessage] = useState("");
 const [success, setSuccess] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setSuccess(false);
  setErrorMessage("");

  if (!email) {
   setErrorMessage("Please enter an email address!");
   setLoading(false);
   return;
  }

  if (!email.includes("@")) {
   setErrorMessage("Please enter a valid email address!");
   setLoading(false);
   return;
  }

  if (!email.includes(".")) {
   setErrorMessage("Please enter a valid email address!");
   setLoading(false);
   return;
  }

  const res = await fetch("/api/invite", {
   body: JSON.stringify({
    email: email,
   }),
   headers: {
    "Content-Type": "application/json",
   },
   method: "POST",
  });
  const { message } = await res.json();
  if (res.status === 200) {
   setSuccess(true);
   setErrorMessage("");
  } else {
   setErrorMessage(message);
   setSuccess(false);
  }
  setLoading(false);
 };

 return (
  <Container>
   <div className="flex min-h-screen flex-col items-center justify-center py-2 drop-shadow-[0_0_69px_rgba(255,255,255,0.6)] duration-200">
    <Link href="/" className="text-2xl font-bold leading-tight tracking-tighter text-white">
     <div className="flex items-center justify-center gap-4 text-5xl">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-rotate">
       <rect width="64" height="64" rx="9" fill="white" />
      </svg>
      <p>Square Stack</p>
     </div>
    </Link>
    <p className="pt-6 text-center text-2xl text-white">
     Join the community of developers
     <br />
     who are building the future of the web.
    </p>
    <div className="pt-6">
     <form onSubmit={handleSubmit}>
      <label htmlFor="email" className="flex justify-center">
       <span className="sr-only">Email</span>
       <input type="email" autoFocus className={`${error ? "border-red-400 text-red-400 " : "border-white/15 "} rounded-lg border bg-transparent px-4 py-2 text-white outline-none`} placeholder="Enter your e-mail" onChange={(e) => setEmail(e.target.value)} />
       <button className="ml-2 flex items-center justify-center rounded-lg bg-white px-4 py-2 text-black outline-none">{loading ? <div class="spinner inline-block h-6 w-6 animate-spin rounded-full border-2 text-black" role="status" /> : "Join us!"}</button>
      </label>
      <div className="flex flex-col items-center justify-center py-2">
       {error && <p className="text-red-400">{error}</p>}
       {success && <p className="text-green-500">Success! Check your email for an invite!</p>}
      </div>
     </form>
    </div>
   </div>
  </Container>
 );
}
