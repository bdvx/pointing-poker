import { RegistrationModel } from "../models/httpModels/registrationModel";
import { ResponseModel } from "../models/httpModels/responseModel";
import { SignInModel } from "../models/httpModels/signInModel";
import HashServise from "./hashServise";
import RegModel from "./mongoDBShcema";
import { UserInfoFromDB } from "../models/httpModels/useFromDBModel";
import { UserInfoModel } from "../models/socketModels/userInfoModel";
import { Room } from "../models/socketModels/roomModel";
import RoomModel from "./mongoDBRoomShema";

const mongoose = require('mongoose')
const bdUrl = 'mongodb+srv://fury:9558985@cluster0.4gdys.mongodb.net/planing-pocker?retryWrites=true&w=majority';

async function addNewUser(user:RegistrationModel) {
  const isConnect = await connectToDB(bdUrl);
  if(!isConnect) return makeResponse(false, "failed to connect to server");

  const userLogin = await RegModel.findOne({login: user.login});
  if(!userLogin) {
    const hashedUser = {...user, password: HashServise.makeHash(user.password)};
    const newUser = new RegModel(hashedUser);
    await newUser.save(); 
    mongoose.connection.close();

    return makeResponse(true, `user ${user.login} registered successfully`);
  } else {
    return makeResponse(false, `user with name ${user.login} is already exist`);
  }
}

async function signIn(user:SignInModel) {
  await connectToDB(bdUrl);

  const userInfoFromBD = await RegModel.findOne({login: user.login});
  if(userInfoFromBD) {
    if(HashServise.comparePassWithHash(user.password, userInfoFromBD.password)) {
      return makeResponse(true, `user ${user.login} login successfully`, makeUserInfoWithOutPassword(userInfoFromBD));
    } else {
      return makeResponse(false, `wrong password`);
    }

  } else {
    return  makeResponse(false, `user ${user.login} is not registered in the system`);
  }
}

async function getUserByLogin(login:string) {
  await connectToDB(bdUrl);

  const userInfo = await RegModel.findOne({login: login});
  if(userInfo) {
    return userInfo as UserInfoFromDB;
  } else {
    return null;
  }
}

async function connectToDB(url:string) {
  try {
    await mongoose.connect(url);
    return true;
  } catch (e) {
    console.log('ошибка подключения к БД');
    return false;
  }
}


function makeResponse(isSuccess:boolean, message:string, body?:any) {
  const status: ResponseModel = { isSuccess, message, body };
  return status;
}

async function saveRoom(room:Room) {
  const isConnect = await connectToDB(bdUrl);
  if(!isConnect) return makeResponse(false, "failed to connect to server");

  const newRoom = new RoomModel(room);
  await newRoom.save(); 
  mongoose.connection.close();
  return makeResponse(true, `room ${room.roomId} registered successfully`);
}

async function getGameById(gameId:string) {
  const isConnect = await connectToDB(bdUrl);
  if(!isConnect) return makeResponse(false, "failed to connect to server");

  const game = await RoomModel.findOne({roomId: gameId});
  if(game) {
    return game;
  } else {
    return ;
  }
}

const MongoDB = {
  addNewUser,
  signIn,
  getUserByLogin,
  saveRoom,
  getGameById
}
export default MongoDB;

function makeUserInfoWithOutPassword(userInfoFromBD:RegistrationModel) {
  const { firstName, lastName, jobPosition, avatar, login } = userInfoFromBD;
  const userInfo:UserInfoModel = {firstName, lastName, jobPosition, avatar, login};
  return userInfo;
}