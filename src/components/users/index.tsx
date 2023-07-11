import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  added_by:string;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const UserList: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`get-add-users/`);
        
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user?.added_by]);

  const handleAddUser = () => {
    history.push('/add-user'); // Route to the add user form
  };

  if (loading) {
    return <p>Loading...</p>;
  }



  return (
    <div className='container my-2'>
      <div className="d-flex justify-content-between mb-2">
        <h2>Users</h2>
        <button className="btn btn-sm btn-primary" onClick={handleAddUser}>
          Add User
        </button>
      </div>
      {users.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>City</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                <td>{user.city}</td>
                <td>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserList;





