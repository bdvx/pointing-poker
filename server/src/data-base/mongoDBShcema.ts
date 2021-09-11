import { Schema, model } from 'mongoose';
import { RegistrationModel } from '../models/registrationModel';

const schema = new Schema<RegistrationModel>({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  jobPosition: { type: String, required: true},
  login: { type: String, required: true},
  role: { type: String, required: true},
  password: { type: String, required: true},
  avatar: { type: String, required: false},
  id: { type: Number, required: false},
});

const RegModel = model<RegistrationModel>('User', schema);

export default RegModel;