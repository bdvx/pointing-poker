import { DialogProps } from '@material-ui/core';

export default interface IPopUpLinearProgressProps extends DialogProps {
  loading: boolean;
  children: React.ReactNode;
};