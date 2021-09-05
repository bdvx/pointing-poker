import { RegistrationModel } from "./models/registrationModel";
import { SignInModel } from "./models/signInModel";
import { Request, Response } from 'express';
import { ResponseModel } from "./models/responseModel";
import DataService from "./dataService";

const express = require('express');
const app = express();

const users: Array<RegistrationModel> = [];

async function regNewUser(req:Request, res:Response) {
/*   const user = (JSON.parse(req.body) as RegistrationModel); */
  const user:RegistrationModel = {
    firstName:'fName',
    jobPosition:"JOb",
    lastName:"lName",
    login:"login",
    password:"hash123",
    role:"role",
    avatar:"avatar",
    id:123
  } 
  console.log(1,user)
  const isSuccess = await DataService.addNewUser(user);
  if(isSuccess) {
    const resInfo:ResponseModel = {
      message: "success"
    }
    res.send(resInfo);

  } else {
    const resInfo:ResponseModel = {
      message: "error"
    }
    res.statusCode = 500;
    res.send(resInfo);
  }
}

function signIn(req:Request, res:Response) {
  console.log('sign')
  const {password, login} = (JSON.parse(req.body) as SignInModel);

  for(let i=0; i<users.length-1; i++) {
    if(users[i].login === login) {
      if(users[i].password === password) {
        res.statusCode = 200;
        res.send({message:"success"});
        return;
      } else {
        //! Поменять код ошибки
        res.statusCode = 404;
        res.send({message:"wrong Password"});
        return;
      }
    }
  }

  res.statusCode = 404;
  res.send({message:"user is not found"});
}

export {
  app,
  regNewUser,
  signIn
}