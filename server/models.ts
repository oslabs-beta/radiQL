// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema); 

const uriSchema = new mongoose.Schema({
  uri: { type: String, required: true},
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true}
})

export const Uri = mongoose.model("Uri", uriSchema); 

// export default { User, Uri }; 