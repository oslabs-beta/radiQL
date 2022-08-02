import * as React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import logo from '../../public/images/radiQL_Logo.png';
import { motion } from 'framer-motion';

const NavBar = props => {
  return (
    <div className="navbar">
      <motion.div
      className="box"
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 10, 0 -10, 0],
      }}
      transition={{
        duration: .5,
        ease: "easeInOut",
        times: [0, 1],
        repeat: Infinity,
        repeatDelay: 10
      }}
      >
        <a id="logo" className="nav-link" href="/">
          <img id="logo" src={logo} />
        </a>
      </motion.div>

      <div className="links">
        <Link className="nav-link" to="/About">About Us</Link>
        <a className="nav-link" href="https://medium.com/">Medium Article</a>
        <a className="nav-link" href="https://github.com/oslabs-beta/radiQL">Github</a>
        <a id="login" className="nav-link" href="#">Login</a>
      </div>
    </div>
  )
}

export default NavBar;