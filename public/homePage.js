
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

//***************************************************************
//    Далее всё ещё в разработке
//**************************************************************

