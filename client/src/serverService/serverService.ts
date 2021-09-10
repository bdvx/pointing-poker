import { RegistrationModel } from "./models/registrationModel";
import { SignInModel } from "./models/signInModel";

const url = "http://localhost:5000/";

async function registerNewUser(regInfo:RegistrationModel) {
  const request = JSON.stringify(regInfo);

  const response = await fetch(url + "regNewUser", {
    body: request,
    method: "POST"
  });

  return response.body;
}

async function signInUser(signInInfo:SignInModel) {
  const request = JSON.stringify(signInInfo);

  const response = await fetch(url + "singIn", {
    body: request,
    method: "POST"
  });

  return response.body;
}

const ServerService = {
  registerNewUser,
  signInUser
}
export default ServerService;