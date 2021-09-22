"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogInOrSignUpPopup = void 0;
const LogInOrSignUpPopup = () => {
    const checkValidation = (params) => {
        const { e, errors, setErrors } = params;
        const { value, name } = e.target;
        if (!errors || !setErrors)
            return;
        let regex = /.+/;
        if (name === 'login') {
            regex = /^[^\s]+$/;
        }
        if (!regex.test(value)) {
            if (!errors.includes(name)) {
                setErrors([...errors, name]);
            }
        }
        else if (errors.includes(name)) {
            const newErrors = errors.filter((error) => error !== name);
            setErrors(newErrors);
        }
    };
    const handleFieldChange = (params) => {
        const { e, fieldsValues, setFieldsValues, errors } = params;
        const { value, name } = e.target;
        setFieldsValues(Object.assign(Object.assign({}, fieldsValues), { [name]: value }));
        if (errors) {
            checkValidation(params);
        }
    };
    const addFieldErrorMessage = (fieldProps, errors) => {
        const { name, title, errorMessage } = fieldProps;
        if (!errors.includes(name))
            return '';
        return errorMessage ? errorMessage : `${title} can't be empty.`;
    };
    return {
        handleFieldChange,
        addFieldErrorMessage
    };
};
exports.LogInOrSignUpPopup = LogInOrSignUpPopup;
//# sourceMappingURL=LogInOrSignUpPopup.js.map