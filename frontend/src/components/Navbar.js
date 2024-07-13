import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';

export default function Navbar(props) {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg bg-danger">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active text-white fs-4" aria-current="page" href="/">{props.title}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active text-white fs-4" aria-current="page" href="/products">Products</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active text-white fs-4" aria-current="page" href="/about">About</a>
            </li>
          </ul>
          {isAuthenticated && user && user.photos && user.photos.length > 0 && (
            <div className="d-flex align-items-center">
              <img src={user.photos[0].value} alt="Profile" className="rounded-circle" width="40" height="40" />
              <span className="text-white fs-5 mx-3">{user.name?.givenName}</span>
              <button onClick={logout} className="btn btn-danger fs-5">Logout</button>
            </div>
          )}
          {!isAuthenticated && (
            <a href="/login" className="btn btn-primary fs-5">Login</a>
          )}
        </div>
      </div>
    </nav>
  );
}

