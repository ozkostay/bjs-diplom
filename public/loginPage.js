"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    console.log(data);
    ApiConnector.login(data, response => {
        //console.log('log: ', response);
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error);
        }
    });
};

userForm.registerFormCallback = (data) => {
    console.log(data);
    ApiConnector.register(data, response => {
        //console.log('reg: ', response);
        if (response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error); 
        }
    });
};

// Сделано несколько этапов в homepage.js !!!!!!!!!!!
// Просьба тоже проверить






