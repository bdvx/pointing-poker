export default interface IFailPopUpProps {
  open: boolean;
  onChangeFailPopUpState: (open: boolean) => void;
  title: string;
  description: string;
};