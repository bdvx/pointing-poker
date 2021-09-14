import { Request, Response } from 'express';
import DataService from "./tools/dataService";

const cors = require('cors')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

async function regNewUser(req:Request, res:Response) {
  const user = req.body;
  const response = await DataService.addNewUser(user);
  if(response.isSuccess) {
    res.statusCode = 200;
    res.send(response);

  } else {
    res.statusCode = 500;
    res.send(response);
  }
}

async function signIn(req:Request, res:Response) {
  const userInfo = req.body;
  const response = await DataService.signInUser(userInfo);

  if(response.isSuccess) {
    res.statusCode = 200;
    res.send(response);
  } else {
    res.statusCode = 404;
    res.send(response);
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