import * as React from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion';

const SaveDatabaseModal = ({setShowSaveModal}) => {

  //onclick function for the newSave modal save button
  const handleSaveClick = async (): Promise<void> => {
    try{
    //get the users URI input
    const dbURI: string = (document.getElementById('userURI') as HTMLInputElement).value;
    //get the users New Name input for the saved database
    const name: string = (document.getElementById('newName') as HTMLInputElement).value;

    //post request with the 2 user inputs as the body to the '/saveURI' route
    const response = await axios.post('/saveURI', {dbURI: dbURI, name: name}, {headers: {'Credentials': true}})

    //if post reqquest successful close modal by settting the show modal to false
    if(response.status == 200) {
      setShowSaveModal(false)
    } else {
      console.log('Error', response)
    } } catch(err) {
    console.log('Error', err)
    }
  }
  return (
    <motion.div drag initial={{ opacity: 0, scale: 0.75, top: 0, right: 0, }} animate={{ opacity: 1, scale: 1, top: 50, right: 30, }} exit={{ top:-150, right:-100, opacity: 0, scale: 0 }} className='save-database-modal-container'>
      <AnimatePresence>
        <label htmlFor="newName">Save Database As:</label>
        <input type="text" id="newName" />
        <button id="save-btn" onClick={() => handleSaveClick()}>Save</button>
      </AnimatePresence>
    </motion.div>
  )
}

export default SaveDatabaseModal