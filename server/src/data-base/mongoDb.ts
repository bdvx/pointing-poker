import { RegistrationModel } from "../models/registrationModel";
import { ResponseModel } from "../models/responseModel";
import { SignInModel } from "../models/signInModel";
import RegModel from "./mongoDBShcema";
const mongoose = require('mongoose')
const bdUrl = 'mongodb+srv://fury:9558985@cluster0.4gdys.mongodb.net/planing-pocker?retryWrites=true&w=majority';

async function connectToDB() {
  try {
    await mongoose.connect(bdUrl);
    return true;
  } catch (e) {
    console.log('ошибка подключения к БД');
    return false;
  }
}

function makeResponse(isSuccess:boolean, message:string) {
  const status: ResponseModel = { isSuccess, message };
  return status;
}

async function addNewUser(user:RegistrationModel) {
  const isConnect = await connectToDB();
  if(!isConnect) return makeResponse(false, "failed to connect to server") 

  const userLogin = await RegModel.find({login: user.login});
  if(!userLogin) {
    const newUser = new RegModel(user);
    await newUser.save(); 
    mongoose.connection.close();

    return makeResponse(true, `user ${user.login} registered successfully`);
  } else {
    return makeResponse(false, `user with name ${user.login} found`);
  }
}

async function signIn(user:SignInModel) {
  await connectToDB();
  const userLogin = await RegModel.findOne({login: user.login});

  if(userLogin) {
    if(userLogin.password === user.password) {
      return makeResponse(true, `user ${user.login} login successfully`);
    } else {
      return makeResponse(false, `wrong password`);
    }

  } else {
    return  makeResponse(false, `user ${user.login} is not registered in the system`);
  }
}

const MongoDB = {
  addNewUser,
  signIn
}

export default MongoDB;