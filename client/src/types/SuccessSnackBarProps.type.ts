export default interface ISuccessSnackBarProps {
  open: boolean;
  onSetOpen: (open: boolean) => void;
  text: string;
}