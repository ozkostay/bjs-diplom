

const logoutBatton = new LogoutButton();

// обработка нажатия кнопки выйти
logoutBatton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    })
};

// заполнение данных профиля
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

// Получение текущих курсов валют
const rateBoard = new RatesBoard();
const reNewStocks = () => {
    //console.log('Обновили валюты');
    ApiConnector.getStocks(response => {
        if (response.success) {
            rateBoard.clearTable();
            rateBoard.fillTable(response.data);
        }
    });
};
reNewStocks();
setInterval( reNewStocks, 5000 );

// Пополнение счета
const moneyManager = new MoneyManager;
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        let message;
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            message = 'Пополнение счета на '  + data.amount  + ' ' + data.currency;
        } else {
            message = response.error;
        }
        // Сообщения придумал сам, готовых не нашел
        moneyManager.setMessage(response.success, message) 
    });
};

//Конвертация валюты
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        let message;
        //console.log('sss ', data);
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            message = 'Конвертация '  + data.fromAmount + ' ' + data.fromCurrency  + ' в ' + data.targetCurrency;
        } else {
            message = response.error;
        }
        // Сообщения придумал сам, готовых не нашел
        moneyManager.setMessage(response.success, message) 
    });
};

// Перевод валюты
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney( data, response => {
        let message;
        //console.log(response);
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            message = 'Перевод '  + data.amount + ' ' + data.currency  + ' для ' + data.to;
        } else {
            message = response.error;
        }
        // Сообщения придумал сам, готовых не нашел
        moneyManager.setMessage(response.success, message) 
    });
};

// Заполнение избранного
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites( data => {
    //console.log(data);
    if (data.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(data.data);
        moneyManager.updateUsersList(data.data);
        
    }
});

// Добавление в избранное
favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            message = 'Добавлен пользователь: ID '  + data.id + ' Имя ' + data.name;
        } else {
            message = message = response.error;
        }
        favoritesWidget.setMessage(response.success, message);
    });
}

// Удаление из избранного
favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            message = 'Пользователь удален';
        } else {
            message = response.error;
        }
        favoritesWidget.setMessage(response.success, message);
    });
}


