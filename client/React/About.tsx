import * as React from 'react';
// @ts-ignore
import logo from '../../public/images/rad2.png';
import { motion } from 'framer-motion';

const About = props => {

  return (
    <div id="about">
      <div className='app-description'>
        <img id='about-logo' src={logo}/>
        <p>
          REST APIs have a problem with over-fetching data, which leads to slow performance; as well as under-fetching data, which leads to creating multiple fetch requests to retrieve the desired data.
        </p>
        <p>
          While GraphQL is great, there is a big learning curve setting up schemas and resolvers. Transitioning from a REST API infrastructure to a GraphQL infrastructure is no easy task.  
        </p>
        <p>
          Th
        </p>
      </div>
      <div className='bro-container'>
        <motion.div className="box"
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1,
            default: {
              duration: 0.3,
            },
            y: {
              type: "spring",
              damping: 40,
              stiffness: 200,
              restDelta: 0.001
            }}}
        >
          <div className='about-box about-1'>
            Alex Cusick
          </div>
          <div className='about-box about-2'>
            Thomas Ho
          </div>
          <div className='about-box about-3'>
            Roy Jiang
          </div>
          <div className='about-box about-4'>
            Zach Robertson
          </div>
          <div className='about-box about-5'>
            Jordan Williams
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About;