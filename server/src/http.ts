import { RegistrationModel } from "./models/registrationModel";
import { SignInModel } from "./models/signInModel";
import { Request, Response } from 'express';
import DataService from "./dataService";

const express = require('express');
const app = express();

/* const users: Array<RegistrationModel> = []; */
const testUserReg:RegistrationModel = {
  firstName:'fName',
  jobPosition:"JOb",
  lastName:"lName",
  login:"login1",
  password:"hash123",
  role:"role",
  avatar:"avatar",
  id:123
} 
const testUserSign: SignInModel = {
  login:"login1",
  password:"hash123"
}

async function regNewUser(req:Request, res:Response) {
/*   const user = (JSON.parse(req.body) as RegistrationModel); */
  const user = testUserReg;

  const response = await DataService.addNewUser(user);
  if(response.isSuccess) {
    res.statusCode = 200;
    res.send(JSON.stringify(response));

  } else {
    res.statusCode = 500;
    res.send(JSON.stringify(response));
  }
}

async function signIn(req:Request, res:Response) {
/*   const userInfo = (JSON.parse(req.body) as SignInModel); */
  const userInfo = testUserSign;
  const response = await DataService.signInUser(userInfo);

  if(response.isSuccess) {
    res.statusCode = 200;
    res.send(JSON.stringify(response));
  } else {
    res.statusCode = 404;
    res.send(JSON.stringify(response));
  }
}

export {
  app,
  regNewUser,
  signIn
}