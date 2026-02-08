import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import statesData from "../data/states.json";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [state, setState] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);

  

  const BIN_ID = "697fabc3ae596e708f09b566";
  const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!contact.trim()) {
      newErrors.contact = "Contact is required";
    } else if (!/^\d{10}$/.test(contact)) {
      newErrors.contact = "Contact must be 10 digits";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!gender) newErrors.gender = "Select gender";
    if (!state) newErrors.state = "Select city";
    if (!terms) newErrors.terms = "Accept terms & conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
  setStates(statesData.states);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const userData = {
      id: Date.now(),
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

      const getRes = await fetch(`${BASE_URL}/latest`, {
        headers: {
          "X-Access-Key":
            "$2a$10$lPiEOqdWyVQ0WoT2eSrIlO5JmQDl2bMaicHbyYotseujDOG5PqYSO",
        },
      });

      const getData = await getRes.json();
      const users = getData.record?.users || [];
      users.push(userData);

      await fetch(BASE_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key":
            "$2a$10$lPiEOqdWyVQ0WoT2eSrIlO5JmQDl2bMaicHbyYotseujDOG5PqYSO",
        },
        body: JSON.stringify({ users }),
      });

      alert("Registration Successful ✅");
      navigate("/users");

      // reset form
      setName("");
      setEmail("");
      setContact("");
      setPassword("");
      setGender("");
      setState("");
      setTerms(false);
      setErrors({});

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
            <div>
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors({ ...errors, name: "" });
                }}
                className="px-3 py-2 border rounded-md w-full"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <input
                placeholder="Contact"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  setErrors({ ...errors, contact: "" });
                }}
                className="px-3 py-2 border rounded-md w-full"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm">{errors.contact}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: "" });
                }}
                className="px-3 py-2 border rounded-md w-full"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <select
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setErrors({ ...errors, state: "" });
                  }}
                  className="px-3 py-2 border rounded-md w-full"
                >
                  <option value="">Select State</option>

                  {states.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
            </div>
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "" });
              }}
              className="px-3 py-2 border rounded-md w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div>
            <div className="flex gap-4">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex items-center gap-1">
                  <input
                    type="radio"
                    value={g}
                    checked={gender === g}
                    onChange={() => {
                      setGender(g);
                      setErrors({ ...errors, gender: "" });
                    }}
                  />
                  {g}
                </label>
              ))}
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => {
                  setTerms(e.target.checked);
                  setErrors({ ...errors, terms: "" });
                }}
              />
              I agree to the Terms & Conditions
            </label>
            {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms}</p>
            )}
          </div>

          <button
            disabled={loading}
            className="w-full bg-yellow-500 text-white py-2 rounded-md font-bold disabled:opacity-60"
          >
            {loading ? "Saving..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
