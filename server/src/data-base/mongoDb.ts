import { RegistrationModel } from "../models/registrationModel";
import { SignInModel } from "../models/signInModel";
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

async function signIn(user:SignInModel) {
  await connectToDB();
  const userLogin = await RegModel.findOne({login: user.login});

  if(userLogin) {
    if(userLogin.password === user.password) {
      console.log('Авторизован');
      return 'success';
    } else {
      console.log('неверный пароль');
      return 'failure';
    }

  } else {
    console.log(`пользователя с логином: ${user.login} не существует`);
    return 'failure';
  }
}

const MongoDB = {
  addNewUser,
  signIn
}

export default MongoDB;