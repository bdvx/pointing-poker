import './SuccessSnackBar.scss';
import { FC } from 'react';
import { Alert, Snackbar } from '@mui/material';
import ISuccessSnackBarProps from '../../../types/SuccessSnackBarProps.type';

export const SuccessSnackBar: FC<ISuccessSnackBarProps> = (props: ISuccessSnackBarProps) => {
  const { open, onSetOpen, text } = props;

  return (
    <Snackbar open={ open } autoHideDuration={ 6000 } onClose={ () => onSetOpen(false) }>
      <Alert onClose={ () => onSetOpen(false) } severity="success">
        { text }
      </Alert>
    </Snackbar>
  );
}