import './Issue.scss';
import { FC } from 'react';
import IIssueProps from '../../../types/IssueProps.type';

export const Issue: FC<IIssueProps> = ({ classes, children }: IIssueProps) => {
  return (
    <div className={ `${ classes } Issue` }>{ children }</div>
  );
};
