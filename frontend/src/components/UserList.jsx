import React, { useEffect, useState } from 'react';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const VITE_URL_RENDER = process.env.VITE_URL_RENDER;

  useEffect(() => {
    fetch(`${VITE_URL_RENDER}/api/v1/users/`) 
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(({ id, name, email }) => (
          <li key={id}>
            <strong>{name}</strong> ({email}) - ID: {id}
          </li>
        ))}
      </ul>
    </div>
  );
}