import React from 'react';
import PropTypes from 'prop-types'

const NavBar=(props)=>{

    return (
  
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                Instant Messenger
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default (NavBar);