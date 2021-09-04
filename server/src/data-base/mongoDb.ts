import { MongoClient } from "mongodb";
import { Mongoose } from "mongoose";
import { RegistrationModel } from "../models/registrationModel";
import RegModel from "./mongoDBShcema";

const client = new Mongoose();

//! Возможно стоит переписать функциями т.k. конструктор не поддерживает асинхронный код 
export default class MongoDB {
  constructor() {
    client.connect('mongodb+srv://poker-planing:9558985@cluster0.oxcy9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',(err)=>{
      console.log('error')
/*       throw new Error(err.); */
    });
  }
  
  static async addNewUser(user:RegistrationModel) {
    const userLOgin = await RegModel.find({login: user.login});
    if(userLOgin) {
      //TODO Отправка http об ошибке регистрации
      console.log('пользователь с таким логином существует')
    } else {
      await RegModel.create(user);
    }
  }

} 