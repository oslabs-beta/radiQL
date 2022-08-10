import * as React from 'react'
import axios from 'axios'



const SavedDatabases = props => {

  const [savedUris , setSavedUris] = React.useState<usersUris | null>(null)

  //uris type 
  type Uris = {
    uri: string;
    user_id: string
    }; 
  
  //Response types
  type usersUris = {
    data: Uris[];
  };
  

  //useEffect for getting user Uris
  React.useEffect(() => {
    
    //get URIS Function
    const GetUsersUris = async (): Promise<void | string>  => {
      try {
        // axios request to server  route '/uris' 
        //post body includes current users ID from cookie.SSID
        const { data, status } = await axios.post<usersUris>(
          //post endpoint
          '/uris',
          //post body - backend is looking for 'userId'
          { userId: document.cookie['SSID']},
          {
            headers: {
              Accept: 'application/json',
            },
          },
        );
        
        console.log(JSON.stringify(data));
        // "response status is: 200"
        console.log('response status is: ', status);
        //set saved uris state to the response of the axios request
        setSavedUris(data)
      }  catch (error) {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';

      }}

    //if SSID cookie exists, run GetUsersUris
    document.cookie['SSID'] && GetUsersUris()
    
  }, [savedUris]);

  return (
    <div>
      <label htmlFor='savedDatabases'>Saved Databases:</label>
      <select name='savedDatabases' id='savedDatabases'>
        {/* for each saved uri make a option inside the select field */}
        {Array.isArray(savedUris) && savedUris.map((uri: Uris) => (
          <option>{uri.uri}</option>
        ))}
      </select>
      
    </div>
  )
}

export default SavedDatabases