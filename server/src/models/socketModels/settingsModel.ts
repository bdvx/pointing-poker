export interface SettingsModel {
  roundTime:number,
  timerNeeded: boolean,
  autoTurn: boolean,
  masterAsPlayer: boolean,
  scoreType: string,
  shortScoreType: string,
  cards: Array<string>
}