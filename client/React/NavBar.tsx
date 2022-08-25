import * as React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import logo from '../../public/images/radiQL_Logo2.png';
import LoginModal from './LoginModal';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = ({ username, setUsername }) => {

  const [showLogin, setShowLogin] = React.useState<boolean>(false)

  return (
    <div className="navbar">
      {/* Logo animation to wiggle 8 degrees every 15 seconds */}
      <motion.div
      className="box"
      animate={{
        // scale: [1, 1, 1],
        rotate: [0, 8, 0 -8, 0],
      }}
      transition={{
        duration: .5,
        ease: "easeInOut",
        times: [0, 1],
        repeat: Infinity,
        repeatDelay: 15
      }}
      >
        <Link id="logo" className="nav-link" to="/">
          <img id="logo" src={logo} />
        </Link>
      </motion.div>

      <div className="links">
        <Link className="nav-link" to="/About">About Us</Link>
        <a className="nav-link" href="https://medium.com/@rjiang12/radiql-the-one-step-solution-for-setting-up-graphql-on-a-postgres-database-3b622ba2e6ec?source=friends_link&sk=a04812c61899882b620e2ebd9a691d64">Medium Article</a>
        <a className="nav-link" href="https://github.com/oslabs-beta/radiQL">Github</a>
        <a id="login" onClick={()=> setShowLogin(!showLogin)} className="nav-link">
          { username === '' ? 'Login' : 'My Account'}
        </a>
        <motion.div>
          <AnimatePresence>
            {showLogin && (
              <LoginModal setShowLogin={setShowLogin} username={username} setUsername={setUsername} />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default NavBar;