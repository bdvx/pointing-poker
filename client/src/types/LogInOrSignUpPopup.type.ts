export default interface IFieldsValues {
  login: string;
  password: string;
  firstName?: string;
  lastName?: string;
  jobPosition?: string;
  avatar?: string;
};

export interface IFieldProps {
  name: string;
  title: string;
  type?: string;
  errorMessage?: string;
};