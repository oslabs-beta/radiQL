import dynamoose from 'dynamoose';
import { nanoid } from 'nanoid';

const userSchema = new dynamoose.Schema({
  _id: { type: String, default: nanoid(), forceDefault: true },
  username: { type: String, hashKey: true, required: true, },
  password: { type: String, required: true },
})

export const User = dynamoose.model('User', userSchema);

const uriSchema = new dynamoose.Schema({
  _id: { type: String, hashKey: true, default: nanoid(), forceDefault: true },
  uri: { type: String, required: true},
  user_id: { type: String, required: true},
  uri_name: { type: String, required: true }, 
})

export const Uri = dynamoose.model('Uri', uriSchema)