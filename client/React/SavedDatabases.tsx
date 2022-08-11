import * as React from 'react'
import axios from 'axios'



const SavedDatabases = ({username, setSelectedDatabase})=> {

  const [savedUris , setSavedUris] = React.useState<usersUris | null>(null)

  //uris type 
  type Uris = {
    uri_name: string;
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
        const { data, status } = await axios.get<usersUris>(
          //endpoint
          '/uris',
          {
            withCredentials: true,
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
      }
    }
    GetUsersUris()
    
  }, [username]);

  return (
    <div>
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