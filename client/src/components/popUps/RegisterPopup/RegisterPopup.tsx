import './RegisterPopup.scss';
import { ChangeEvent, FC, useState } from 'react';
import { Avatar, Button, Dialog, DialogActions, Input, Switch, TextField } from '@material-ui/core';
import IRegisterPopupProps from '../../../types/RegisterPopupProps.type';
import IRegisterPopupFieldsValues from '../../../types/RegisterPopupFieldsValues.type';
import IRegisterPopupFieldsProps from '../../../types/RegisterPopupFieldsProps.type';
import { REGISTER_POPUP_FIELDS } from '../../../constants';
import ServerService from '../../../serverService/serverService';
import { RegistrationModel } from '../../../serverService/models/registrationModel';
import { HttpResponseModel } from '../../../serverService/models/httpResponseModel';
import { useHistory } from 'react-router';

export const RegisterPopup: FC<IRegisterPopupProps> = ({classes, open, onChangeRegisterPopupState}: IRegisterPopupProps) => {
  const [role, setRole] = useState<boolean>(true);
  const [avatar, setAvatar] = useState<string>('');
  const history = useHistory();

  const [fieldsValues, setFieldsValues] = useState<IRegisterPopupFieldsValues>({
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    jobPosition: '',
    avatar: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const checkValidation = (value: string, fieldName: string): void => {
    let regex = /.+/;

    if (fieldName === 'login') {
      regex = /^[^\s]+$/;
    }

    if (!regex.test(value)) {
      if (!errors.includes(fieldName)) {
        setErrors([...errors, fieldName]);
      }
    } else if (errors.includes(fieldName)) {
      const newErrors = errors.filter((error) => error !== fieldName);
      setErrors(newErrors);
    }
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { value, name } = e.target;

    setFieldsValues({
      ...fieldsValues,
      [name]: value
    });

    checkValidation(value, name);
  };

  const changeStringAvatar = (name: string): string | null => {
    if (!name) return null;

    return (name.length) > 1 ? `${name[0]}${name[name.length - 1]}` : `${name[0]}`;
  };

  const changeAvatar = (target: HTMLInputElement | HTMLTextAreaElement): void => {
    const file = (target as { files: FileList }).files[0];

    if (file) {
      target.value = '';
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          setAvatar(reader.result.toString());
          setFieldsValues({...fieldsValues, avatar:reader.result.toString()});
        }
      }
      
      reader.readAsDataURL(file);
    }
  };

  const addFieldErrorMessage = ({ name, title, errorMessage }: IRegisterPopupFieldsProps): string => {
    if (!errors.includes(name)) return '';

    return errorMessage ? errorMessage : `${ title } can't be empty.`;
  }

  const HandleConfirmRegistration = async () => {
    const response = await ServerService.registerNewUser(fieldsValues);

    //TODO прикрутить лоадер
  /*   if(response.isSuccess) */
    if(true) {
      //попап
      //response.message хранит информацию 
  
          //alert - временная замена попАпу
      //история должна пушится после закрытия попапа успешной регистрации

      history.push('/welcomePage');
      alert(response);
      onChangeRegisterPopupState(false);
    } else {
      //ошибка создания
      //response.message хранит информацию ошибки
    }
  
  }

  return (
    <Dialog className={`register-popup ${ classes }`} open={open} onClose={() => onChangeRegisterPopupState(false)}>
      <form className="register-popup__form">
        <div className="register-popup__header">
          <h3 className="register-popup__title">Register new user</h3>
{/*           <label className="register-popup__role-block">
            <span className="register-popup__role-title">Connect as<br/>Observer</span>
            <Switch
              className="register-popup__role"
              checked={role}
              onChange={() => setRole(!role)}
              color="primary"
            />
          </label> */}
        </div>

        {
          REGISTER_POPUP_FIELDS.map((field) => (
            <div className="register-popup__field-block" key={field.name}>
              <label>
                <span className="register-popup__field-title">Your { field.title }:</span>
                <TextField
                  className="register-popup__field"
                  defaultValue={ fieldsValues[field.name as keyof IRegisterPopupFieldsValues] }
                  onChange={ (e) => handleFieldChange(e) }
                  name={ field.name }
                  error={ errors.includes(field.name) }
                  helperText={ addFieldErrorMessage(field) }
                  type={ field.type ? field.type : 'text' }
                  variant="outlined"
                  size="small"
                />
              </label>
            </div>
          ))
        }

        <div className="register-popup__avatar-block">
          <span className="register-popup__field-title">Image:</span>

          <div className="register-popup__avatar-btns">
            <label
              className="register-popup__avatar-btn-wrap"
              htmlFor="register-popup__avatar-file"
            >
              <Input
                id="register-popup__avatar-file"
                type="file"
                onChange={(e) => changeAvatar(e.target)}
              />
              <Button
                className="register-popup__avatar-btn"
                variant="contained"
                size="large"
                component="span"
              >
                Choose file
              </Button>
            </label>
            <Button
              className="register-popup__avatar-block-btn"
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setAvatar('')}
            >
              Reset 
            </Button>
          </div>

          <Avatar
            className="register-popup__avatar"
            alt="Avatar"
            src={ avatar }
            children={changeStringAvatar(fieldsValues.firstName)}
          />
        </div>
        <DialogActions className="register-popup__btns">
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={errors.length > 0}
            onClick={() => HandleConfirmRegistration()}
          >
            Confirm
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => onChangeRegisterPopupState(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

