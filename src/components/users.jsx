import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const BIN_ID = "697fabc3ae596e708f09b566";
  const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/latest`, {
          headers: {
            "X-Access-Key":
              "$2a$10$lPiEOqdWyVQ0WoT2eSrIlO5JmQDl2bMaicHbyYotseujDOG5PqYSO",
          },
        });

        const data = await res.json();
        setUsers(data.record?.users || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading users...</p>;
  }

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-yellow-600">
        Registered Users
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-yellow-200 rounded-lg">
          <thead className="bg-yellow-400 text-white">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Gender</th>
              <th className="p-2">City</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={index}
                  className="text-center border-t hover:bg-yellow-50"
                >
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.contact}</td>
                  <td className="p-2">{user.gender}</td>
                  <td className="p-2">{user.state}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
