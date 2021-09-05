import { RegistrationModel } from "./models/registrationModel";
import MongoDB from "./data-base/mongoDb";
import { SignInModel } from "./models/signInModel";

export default class DataService {
  static async addNewUser(user:RegistrationModel) {
    const isSuccess = await MongoDB.addNewUser(user);
    return isSuccess;
  }
 
  static async signInUser(user:SignInModel) {
    const isSuccess = await MongoDB.signIn(user);
    return isSuccess;
  }

  static async updateUser() {
  }
 
}