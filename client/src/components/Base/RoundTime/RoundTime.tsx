import './RoundTime.scss';
import { FC } from 'react';
import IRoundTimeProps from '../../../types/RoundTimeProps.type';

export const RoundTime: FC<IRoundTimeProps> = ({ classes, children }: IRoundTimeProps) => {
  return (
    <div className={ `${ classes } RoundTime`}>
      <div className="RoundTime__header">
        <span>minutes</span>
        <span>seconds</span>
      </div>

      <div className="RoundTime__container">
        { children }
      </div>
    </div>
  );
};