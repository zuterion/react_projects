import React, { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [state, setState] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const BIN_ID = "697fabc3ae596e708f09b566"; 
  const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !gender || !state || !terms) {
      alert("Please fill all fields and accept terms & conditions");
      return;
    }

    const userData = {
      name,
      contact,
      email,
      password,
      gender,
      state,
      terms,
    };

    try {
      setLoading(true);

      const getRes = await fetch(`${BASE_URL}/latest`,{
        headers: {
              "X-Access-Key": "$2a$10$lPiEOqdWyVQ0WoT2eSrIlO5JmQDl2bMaicHbyYotseujDOG5PqYSO"
          }
      });
      const getData = await getRes.json();

      const users = getData.record?.users || [];
      users.push(userData);


      await fetch(BASE_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": "$2a$10$lPiEOqdWyVQ0WoT2eSrIlO5JmQDl2bMaicHbyYotseujDOG5PqYSO" 
        },
        body: JSON.stringify({ users }),
      });

      alert("Registration Successful ✅");

      setName("");
      setEmail("");
      setContact("");
      setPassword("");
      setGender("");
      setState("");
      setTerms(false);

    } catch (error) {
      console.error(error);
      alert("Failed to save data ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg border border-yellow-200">
        <h2 className="text-2xl font-bold text-center mb-4 text-yellow-600">
          Registration Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400"
            />
            <input
              placeholder="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400"
            />

            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select City</option>
              <option>Bhubaneswar</option>
              <option>Kolkata</option>
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Chennai</option>
            </select>
          </div>

          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400"
          />

          
          <div className="flex gap-4">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={(e) => setGender(e.target.value)}
                  className="accent-yellow-500"
                />
                {g}
              </label>
            ))}
          </div>

          
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="accent-yellow-500"
            />
            I agree to the Terms & Conditions
          </label>

          
          <button
            disabled={loading}
            className="w-full bg-yellow-500 text-white py-2 rounded-md font-bold hover:bg-yellow-600 transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
