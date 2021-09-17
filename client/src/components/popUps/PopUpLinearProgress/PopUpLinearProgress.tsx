import './PopUpLinearProgress.scss';
import { LinearProgress, Dialog } from '@material-ui/core';
import { FC } from 'react';
import IPopUpLinearProgressProps from '../../../types/PopUpLinearProgressProps.type';

export const PopUpLinearProgress: FC<IPopUpLinearProgressProps> = ({ loading, children, ...props }: IPopUpLinearProgressProps) => {
  return (
    <Dialog {...props} className={ `${ props.className } PopUpLinearProgress`}>
      { loading && <LinearProgress /> }
      { children }
    </Dialog>
  );
};