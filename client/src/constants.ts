export const LOGIN_POPUP_FIELDS = ['login', 'password'];

export const REGISTER_POPUP_FIELDS = [
  {
    name: 'login',
    title: 'login',
    errorMessage: 'Login can\'t be empty and contain spaces.'
  },
  {
    name: 'password',
    title: 'password',
    type: 'password'
  },
  {
    name: 'firstName',
    title: 'first name',
  },
  {
    name: 'lastName',
    title: 'last name',
  },
  {
    name: 'jobPosition',
    title: 'job position',
  }
];

export const REGISTER_POPUP_FIELDS_DEFAULT_VALUES = {
  login: '',
  password: '',
  firstName: '',
  lastName: '',
  jobPosition: '',
  avatar: ''
};

export const ISSUE_DEFAULT_VALUES = {
  title: '',
  priority: 'low',
  link: '',
  id: ''
};

export const APP_AUTHORS_GITHUB_USERNAME = ['WFZ1', 'JxmJuice', 'FURY-PERSON', 'bdvx'];