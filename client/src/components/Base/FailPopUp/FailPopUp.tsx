import './FailPopUp.scss';
import { FC } from 'react';
import { Dialog } from '@material-ui/core';
import { Alert, AlertTitle } from '@mui/material';
import IFailPopUpProps from '../../../types/FailPopUpProps';

export const FailPopUp: FC<IFailPopUpProps> = (props: IFailPopUpProps) => {
  const { open, onChangeFailPopUpState, title, description } = props;

  return (
    <Dialog className="FailPopUp" open={ open } onClose={ () => onChangeFailPopUpState(false) }>
      <Alert onClose={ () => onChangeFailPopUpState(false) } variant="outlined" severity="error">
        <AlertTitle>{ title }</AlertTitle>
        { description }
      </Alert>
    </Dialog>
  );
};