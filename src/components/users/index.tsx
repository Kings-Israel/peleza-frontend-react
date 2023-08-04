import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { checkPermission } from 'utils/functions';
import ReactPaginate from 'react-paginate';

interface User {
  client_id: string;
  client_first_name: string;
  client_last_name: string;
  client_login_username: string;
  client_mobile_number: string;
  added_by:string;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const UserList: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginationState, setPaginationState] = useState({
    currentPage: 1
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem('preserve-filters', 'false');
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`get-add-users/`);
        setUsers(response.data);
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

  const handlePageChange = (selectedPage: { selected: number }) => {
    setPaginationState({
      currentPage: selectedPage.selected + 1
    })
  };

  if (loading) {
    return <h3 className='mx-auto text-muted'>Loading...</h3>;
  }
  const { currentPage } = paginationState;
  const itemsPerPage = 10; // Adjust this value based on your requirement
  const totalItems = users.length;
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the recentReports array based on the current page
  const paginatedUsers = users.slice(startIndex, endIndex);
  return (
    <div className='container my-2'>
      <div className="d-flex justify-content-between mb-2">
        <h2>Users</h2>
        {checkPermission('create users') ? (
          <button className="btn btn-sm btn-primary" onClick={handleAddUser}>
            Add User
          </button>
        ): ''}
      </div>
      {paginatedUsers.length > 0 ? (
        <>
          <table className="user-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.client_first_name}</td>
                  <td>{user.client_last_name}</td>
                  <td>{user.client_login_username}</td>
                  <td>{user.client_mobile_number}</td>
                  <td className='d-flex justify-content-center'>
                    <Link to={'/edit-user/'+user.client_id} className="btn btn-sm btn-danger rounded">Edit User</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-container">
            <ReactPaginate
              pageCount={pageCount}
              pageRangeDisplayed={1} // Set the page range to 1 to display only the current page
              marginPagesDisplayed={1} // Adjust this value based on your requirement
              onPageChange={handlePageChange}
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              activeClassName="active"
              previousLabel={<span>&#8592;</span>} // Custom arrow for previous page
              nextLabel={<span>&#8594;</span>} // Custom arrow for next page
            />
          </div>
        </>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserList;





