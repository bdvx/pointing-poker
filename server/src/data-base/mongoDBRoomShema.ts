import { Schema, model } from 'mongoose';
import { RegistrationModel } from '../models/httpModels/registrationModel';
import { Room } from '../models/socketModels/roomModel';

const schema = new Schema<Room>({
  game:{type:Schema.Types.Mixed, required: false},
  chat:[{type:Schema.Types.Mixed, required: true}],
  inGame: [{type:Schema.Types.Mixed, required: true}],
  roomId:{type:String, required: true},
  roomUrl:{type:String, required: true},
  scrumInfo:{type:Schema.Types.Mixed, required: true},
  votes:[{type:Schema.Types.Mixed, required: true}],
});

const RoomModel = model<RegistrationModel>('Room', schema);

export default RoomModel;