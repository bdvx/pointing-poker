import { ChangeEvent, SetStateAction } from 'react';

export default interface IFieldsValues {
  login: string;
  password: string;
  firstName?: string;
  lastName?: string;
  jobPosition?: string;
};

export interface IFieldProps {
  name: string;
  title: string;
  type?: string;
  errorMessage?: string;
};

export interface IHandleFieldChangeParams {
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  fieldsValues: IFieldsValues;
  setFieldsValues: (value: SetStateAction<IFieldsValues>) => void;
  errors?: string[];
  setErrors?: (value: SetStateAction<string[]>) => void;
};