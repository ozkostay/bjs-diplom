"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    console.log(data);
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        }
    });
};

userForm.registerFormCallback = (data) => {
    console.log(data);
    ApiConnector.register(data, response => {
        console.log('reg: ', response);
    });
};








