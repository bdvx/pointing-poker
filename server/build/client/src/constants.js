"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_AUTHORS_GITHUB_USERNAME = exports.REGISTER_POPUP_FIELDS_DEFAULT_VALUES = exports.REGISTER_POPUP_FIELDS = exports.LOGIN_POPUP_FIELDS = void 0;
exports.LOGIN_POPUP_FIELDS = ['login', 'password'];
exports.REGISTER_POPUP_FIELDS = [
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
exports.REGISTER_POPUP_FIELDS_DEFAULT_VALUES = {
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    jobPosition: '',
    avatar: ''
};
exports.APP_AUTHORS_GITHUB_USERNAME = ['WFZ1', 'JxmJuice', 'FURY-PERSON', 'bdvx'];
//# sourceMappingURL=constants.js.map