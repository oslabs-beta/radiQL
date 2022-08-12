import * as React from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const SaveDatabaseModal = ({GetUsersUris, setShowSaveModal}) => {

  const [dbInput, setdbInput] = React.useState<string>();

  //onclick function for the newSave modal save button
  const handleSaveClick = async (): Promise<void> => {
    try{
    //get the users URI input
    const dbURI: string = (document.getElementById('userURI') as HTMLInputElement).value;
    //get the users New Name input for the saved database
    const name: string = (document.getElementById('newName') as HTMLInputElement).value;

    //post request with the 2 user inputs as the body to the '/saveURI' route
    console.log('dbURI', dbURI)
    console.log('name', name)
    const response = await axios.post('/saveURI', {dbURI: dbURI, name: name})
    
    //if post reqquest successful close modal by settting the show modal to false
    if(response.status == 200) {
      GetUsersUris();
      setShowSaveModal(false)
    } else {
      console.log('Error', response)
    } } catch(err) {
      console.log('Error', err)
    }
  }

  // Function to check letters and numbers
  const alphanumeric = (e) => {
    const letterNumber = /^[0-9a-zA-Z]+$/;
    const newText = e.target.value;
    console.log(newText);
    if (newText.match(letterNumber)){
      setdbInput(newText);
    }
    else {
      alert("Not alphanumeric");
    }
  }

  return (
    <motion.div drag key='saveURI' initial={{ opacity: 0, scale: 0.75, top: 500, right: 50 }} animate={{ opacity: 1, scale: 1, top: 500, right: 30, }} exit={{ top:-150, right:-100, opacity: 0, scale: 0 }} className='save-database-modal-container'>
      <AnimatePresence>
        <FaTimes id='close-icon' onClick={()=> setShowSaveModal()}/>
        <label htmlFor="newName">Save Database As:</label>
        <input 
          type="text" 
          id="newName" 
          onChange={(e) => alphanumeric(e)} 
          value={dbInput}
        />
        <button 
          id="save-btn" 
          onClick={() => handleSaveClick()}>
          Save
        </button>
      </AnimatePresence>
    </motion.div>
  )
}

export default SaveDatabaseModal