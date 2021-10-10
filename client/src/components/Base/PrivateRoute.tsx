import { FC } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { BASE_URL } from '../../constants';
import IPrivateRouteProps from '../../types/PrivateRouteProps.type';

export const PrivateRoute: FC<IPrivateRouteProps> = (props: IPrivateRouteProps) => {
  const { component, authed, ...rest } = props;
  const Component = component as FC<RouteComponentProps>;

  return (
    <Route
      { ...rest }
      
      render={
        (routeProps) => authed === true
          ? <Component { ...routeProps } />
          : <Redirect to={{ pathname: BASE_URL, state: { from: routeProps.location } }} />
      }
    />
  );
};
