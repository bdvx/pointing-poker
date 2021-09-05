import { RegistrationModel } from "../models/registrationModel";
import RegModel from "./mongoDBShcema";
const mongoose = require('mongoose')
const bdUrl = 'mongodb+srv://fury:9558985@cluster0.4gdys.mongodb.net/planing-pocker?retryWrites=true&w=majority';

async function connectToDB() {
  try {
    await mongoose.connect(bdUrl)
  } catch (e) {
    console.log('ошибка подключения')
  }
}

async function addNewUser(user:RegistrationModel) {
  await connectToDB();
  const userLogin = await RegModel.find({login: user.login});

  if(!userLogin) {
    const newUser = new RegModel(user);
    await newUser.save(); 
    mongoose.connection.close();
    
    console.log(`юзер ${user.login} добавлен`);
    return 'success';
  } else {
    console.log(`юзер с логином  ${user.login} уже существует`)
    return 'failure';
  }
}

const MongoDB = {
  addNewUser,
  connectToDB
}

export default MongoDB;