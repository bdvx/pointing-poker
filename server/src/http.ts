import { RegistrationModel } from "./models/registrationModel";
import { SignInModel } from "./models/signInModel";
import { Request, Response } from 'express';
import { ResponseModel } from "./models/responseModel";
import DataService from "./dataService";

const express = require('express');
const app = express();

const users: Array<RegistrationModel> = [];
const testUserReg:RegistrationModel = {
  firstName:'fName',
  jobPosition:"JOb",
  lastName:"lName",
  login:"login",
  password:"hash123",
  role:"role",
  avatar:"avatar",
  id:123
} 
const testUserSign: SignInModel = {
  login:"login",
  password:"hash12"
}

async function regNewUser(req:Request, res:Response) {
/*   const user = (JSON.parse(req.body) as RegistrationModel); */
  const user = testUserReg;

  const isSuccess = await DataService.addNewUser(user);
  if(isSuccess === 'success') {
    const resInfo:ResponseModel = { message: "reg success" };
    res.statusCode = 200;
    res.send(resInfo);

  } else {
    const resInfo:ResponseModel = { message: "regError" };
    res.statusCode = 500;
    res.send(resInfo);
  }
}

async function signIn(req:Request, res:Response) {
/*   const userInfo = (JSON.parse(req.body) as SignInModel); */
  const userInfo = testUserSign;
  const isSuccess = await DataService.signInUser(userInfo);

  if(isSuccess === 'success') {
    const resInfo:ResponseModel = { message: "Sign in success" };
    res.statusCode = 200;
    res.send(resInfo);
  } else {
    const resInfo:ResponseModel = { message: "signInError" };
    res.statusCode = 404;
    res.send(resInfo);
  }

}

export {
  app,
  regNewUser,
  signIn
}