import { FC } from 'react';
import { RouteProps } from 'react-router';

export default interface IPrivateRouteProps extends RouteProps {
  component: FC;
  authed: boolean;
};
