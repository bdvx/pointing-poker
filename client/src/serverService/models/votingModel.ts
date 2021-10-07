export interface VotingModel {
  whoOffer: string, //login
  whoKick: string, //login
  message: string,
  amountAgree: number,
  isVoiting: boolean,
  votes?: Array<{login: string, conclusion?:boolean}>
}