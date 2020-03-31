import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-md navbar-dark navbar-default fixed-top '>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span classNameName='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <a className='nav-link' href='#HOME'>
              Jeff Won
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#ABOUT'>
              About
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#PROJECT'>
              Project
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a className='nav-link' href='#CONTACT'>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
