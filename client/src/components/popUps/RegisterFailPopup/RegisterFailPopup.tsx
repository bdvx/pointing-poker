import { Dialog } from '@material-ui/core';
import { FC } from 'react';
import './RegisterFailPopup.scss';
import { Alert, AlertTitle } from '@mui/material';
import IRegisterFailPopupProps from '../../../types/RegisterFailPopupProps.type';

export const RegisterFailPopup: FC<IRegisterFailPopupProps> = (props: IRegisterFailPopupProps) => {
  const { open, onChangeRegisterFailPopupState } = props;

  return (
    <Dialog className="RegisterFailPopup" open={ open } onClose={ () => onChangeRegisterFailPopupState(false) }>
      <Alert onClose={ () => onChangeRegisterFailPopupState(false) } variant="outlined" severity="error">
        <AlertTitle>Fail registration</AlertTitle>
        This is an error alert — check it out!
      </Alert>
    </Dialog>
  );
};