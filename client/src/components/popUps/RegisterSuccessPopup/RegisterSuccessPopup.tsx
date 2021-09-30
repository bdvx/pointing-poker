import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@material-ui/core';
import { FC } from 'react';
import IRegisterSuccessPopupProps from '../../../types/RegisterSuccessPopupProps.type';
import './RegisterSuccessPopup.scss';
import { useHistory } from 'react-router';

export const RegisterSuccessPopup: FC<IRegisterSuccessPopupProps> = (props: IRegisterSuccessPopupProps) => {
  const { open, onChangeRegisterSuccessPopupState } = props;
  const router = useHistory();

  const closePopup = () => {
    onChangeRegisterSuccessPopupState(false);
    router.push('/welcomePage');
  };

  return (
    <Dialog className="RegisterSuccessPopup" open={ open } onClose={ () => onChangeRegisterSuccessPopupState(false) }>
      <DialogTitle>Success registration</DialogTitle>
      
      <DialogContent>
        <DialogContentText>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</DialogContentText>

        <DialogContentText >Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</DialogContentText>

        <DialogContentText>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</DialogContentText>
      </DialogContent>

      <Divider />

      <DialogActions>
        <Button autoFocus onClick={ closePopup }>OK</Button>
      </DialogActions>
    </Dialog>
  );
};