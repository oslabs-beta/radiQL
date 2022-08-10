import mongoose from 'mongoose'

// Schema for Users that stores their username and encrypted password
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema); 

// Schema for Uris that stores the inputted uris for each user 
const uriSchema = new mongoose.Schema({
  uri: { type: String, required: true},
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true}, 
  uri_name: { type: String, require: true }
})

export const Uri = mongoose.model("Uri", uriSchema); 

// export default { User, Uri }; 