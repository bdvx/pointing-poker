import { RegistrationModel } from "./models/registrationModel";
import { SignInModel } from "./models/signInModel";
import { Request, Response } from 'express';
import { ResponseModel } from "./models/responseModel";

const express = require('express');
const app = express();

const users: Array<RegistrationModel> = [];

function regNewUser(req:Request, res:Response) {
  console.log(req)
  const info = (JSON.parse(req.body) as RegistrationModel);

  try {//успешная регистрация
    users.push(info);

    const resInfo:ResponseModel = {
      //!Код успеха :)
      statusCode: 200,
      message: "success"
    }
    res.send(resInfo);
  }
  catch(e) { //ошибка
    const resInfo:ResponseModel = {
      //!Код ошибок
      statusCode: 500,
      message: "error"
    }
    res.send(resInfo);
  }
}

function signIn(req:Request, res:Response) {
  console.log('sign')
  const {password, login} = (JSON.parse(req.body) as SignInModel);

  for(let i=0; i<users.length-1; i++) {
    if(users[i].login === login) {
      if(users[i].password === password) {
        res.send({statusCose:200, message:"success"});
        return;
      } else {
        res.send({statusCode:400, message:"wrong Password"});
        return;
      }
    }
  }
  res.send({statusCode:404, message:"user is not found"});
}

export {
  app,
  regNewUser,
  signIn
}