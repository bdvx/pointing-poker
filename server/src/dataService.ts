import { RegistrationModel } from "./models/registrationModel";
import MongoDB from "./data-base/mongoDb";

export default class DataService {
  static async addNewUser(user:RegistrationModel) {
    await MongoDB.addNewUser(user);
    return 'success';
  }
 
  static async updateUser() {
  }
 
  static async signInUser() {
  }


}