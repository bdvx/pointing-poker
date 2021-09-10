const {createHash} = require('crypto');

export default class HashServise {
  static makeHash(password: string) {
    const hash = createHash('sha256');
    hash.write(password);
    return hash.digest('base64');
  }

  static comparePassWithHash(password: string, hash:string) {
    return (HashServise.makeHash(password) === hash) ? true : false;
  }
}