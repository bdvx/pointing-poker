import { Schema, model } from 'mongoose';
import { RegistrationModel } from '../models/httpModels/registrationModel';
import { Room } from '../models/socketModels/roomModel';

const schema = new Schema<Room>({
  game:{required: false},
  chat:{required: false},
  inGame:{required: false},
  isPlaying:{required: false},
  roomId:{required: false},
  roomUrl:{required: false},
  scrumInfo:{required: false},
  votes:{required: false},
});

const RoomModel = model<RegistrationModel>('Room', schema);

export default RoomModel;