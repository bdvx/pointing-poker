import { RegistrationModel } from "./models/httpModels/registrationModel";
import { SignInModel } from "./models/httpModels/signInModel";
import { Request, Response } from 'express';
import DataService from "./tools/dataService";

const cors = require('cors')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
/* const users: Array<RegistrationModel> = []; */
const testUserReg:RegistrationModel = {
  firstName:'fName',
  jobPosition:"JOb",
  lastName:"lName",
  login:"login1",
  password:"hash123",
  //role:"role",
  avatar:"avatar",
  id:123
} 
const testUserSign: SignInModel = {
  login:"login1",
  password:"hash123"
}

async function regNewUser(req:Request, res:Response) {
  const user = req.body;
  const response = await DataService.addNewUser(user);
  if(response.isSuccess) {
    res.statusCode = 200;
    res.send(response);

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

function joinLobbyByUrl() {

}
export {
  app,
  regNewUser,
  signIn,
  joinLobbyByUrl
}