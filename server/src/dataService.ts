import { RegistrationModel } from "./models/registrationModel";
import MongoDB from "./data-base/mongoDb";

export default class DataService {
  static async addNewUser(user:RegistrationModel) {
    const isSuccess = await MongoDB.addNewUser(user);
    return isSuccess;
  }
 
  static async updateUser() {
  }
 
  static async signInUser() {
  }


}