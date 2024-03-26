import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
        <h3>CRUD Operation</h3>
        <nav className='userNavLink'>
          <Link to="/user/addUser">Add User</Link>
          <Link to="/user/updateUser">Update User</Link>
          <Link to="/user/">List of Users</Link>
        </nav>
    </div>
  )
}

export default Header