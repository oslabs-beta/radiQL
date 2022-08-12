import * as React from 'react'
import axios from 'axios'
import {Uris} from './types'

const SavedDatabases = ({savedUris, GetUsersUris, username, setSelectedDatabase})=> {
  
  // Call GetUsersUris whenever the username changes
  React.useEffect(() => {
    GetUsersUris()
  }, [username]);

  return (
    <div id='saved-db-container'>
      <select name='savedDatabases' id='savedDatabases' onChange={(e)=> setSelectedDatabase(e.target.value)}>
        {/* for each saved uri make a option inside the select field */}
        <option selected disabled>Saved Databases</option>
        {Array.isArray(savedUris) && savedUris.map((uri: Uris) => (
        <option value={uri.uri_name}>{uri.uri_name}</option>
        ))}
      </select>
    </div>
  )
}

export default SavedDatabases