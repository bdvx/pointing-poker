import { CardPopup } from "../../../CardPopup/CardPopup";

export interface CardPopupProps {
    open: boolean;
    onChangePopupState: (open: boolean) => void;
}
export const CreateCardPopup = (props: CardPopupProps) => {
    console.log(props)
    return (
      <CardPopup { ...props } />
    );
  };