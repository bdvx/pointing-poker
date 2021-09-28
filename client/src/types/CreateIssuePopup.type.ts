export default interface ICreateIssuePopup {
  open: boolean;
  onChangePopupState: (open: boolean) => void;
};