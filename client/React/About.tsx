import * as React from 'react';
// @ts-ignore
import logo from '../../public/images/rad2.png';
// @ts-ignore
import about1 from '../../public/images/about1.png';
// @ts-ignore
import alex from '../../public/images/profiles/alex.jpeg';
// @ts-ignore
import roy from '../../public/images/profiles/roy.png';
// @ts-ignore
import zach from '../../public/images/profiles/zach.png';
// @ts-ignore
import thomas from '../../public/images/profiles/thomas.png';
// @ts-ignore
import jordan from '../../public/images/profiles/jordan.png';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const About = props => {

  return (
    <div id="about">
      <motion.div className="box"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween", duration: 0.7 }}
      > 
      <div className='app-description'>
        <img id='about-logo' src={logo}/>
        <section className='info-1'>
          <span>
            <header>What is radiQL?</header>
            <hr/>
            <p>
              radiQL is a web application for generating GraphQL schemas and resolvers for your database. 
            </p>
            <p>
              While GraphQL is great, there is a big learning curve setting up schemas and resolvers. Transitioning from a REST API infrastructure to a GraphQL infrastructure is no easy task.  
            </p>
          </span>
          <img src={about1}></img>
        </section>
        <section className='info-1'>
          <img src={about1}></img>
          <span>
            <header>Why use GraphQL?</header>
            <hr/>
            <p>
              REST APIs are great, but they have some problems that can slow down servers, especially when working with large databases. REST calls have a problem with over-fetching data, which leads to longer response times; as well as under-fetching data, which leads to creating multiple fetch requests to retrieve the desired data.
            </p>
            <p>
              While GraphQL is great, there is a big learning curve setting up schemas and resolvers. Transitioning from a REST API infrastructure to a GraphQL infrastructure is no easy task.  
            </p>
            <p>
              That's where our app comes in...
            </p>
          </span>
        </section>
      </div>
      </motion.div>
      
      {/* <motion.div className="box"
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
      >  */}
      <header>Meet The Team</header>
      <hr/>
      <div className='bro-container'>
          <span className='about-box about-1'>
            <img src={alex}/>
            <section>
              <header className="name">Alex Cusick</header>
              <p>
                <a className='link' href="https://github.com/Alex-cusick">
                  < FaGithub /> 
                </a>
                <a className='link' href="https://www.linkedin.com/in/alex-q6/">
                  < FaLinkedin />
                </a>
              </p>
            </section>
          </span>
          <span className='about-box about-2'>
            <img src={thomas}/>
            <section>
              <header className="name">Thomas Ho</header>
              <p>
                <a className='link' href="https://github.com/t1ho">
                  < FaGithub /> 
                </a>
                <a className='link' href="https://www.linkedin.com/in/t1ho/">
                  < FaLinkedin />
                </a>
              </p>
            </section>
          </span>
          <span className='about-box about-3'>
            <img src={roy}/>
            <section>
              <header className="name">Roy Jiang</header>
              <p>
                <a className='link' href="https://github.com/rjiang12">
                  < FaGithub /> 
                </a>
                <a className='link' href="https://www.linkedin.com/in/royjiang2025/">
                  < FaLinkedin />
                </a>
              </p>
            </section>
          </span>
          <span className='about-box about-4'>
            <img src={zach}/>
            <section>
              <header className="name">Zach Robertson</header>
              <p>
                <a className='link' href="https://github.com/Zachrobdev">
                  < FaGithub /> 
                </a>
                <a className='link' href="https://www.linkedin.com/in/zach-robertson-profile/">
                  < FaLinkedin />
                </a>
              </p>
            </section>
          </span>
          <span className='about-box about-5'>
            <img src={jordan}/>
            <section>
              <header className="name">Jordan Williams</header>
              <p>
                <a className='link' href="https://github.com/jordanobl">
                  < FaGithub /> 
                </a>
                <a className='link' href="">
                  < FaLinkedin />
                </a>
              </p>
            </section>
          </span>
      </div>
      <br style={{height: "100px"}}/>
      {/* </motion.div> */}
    </div>
  )
}

export default About;
