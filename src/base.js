// файл для работы с google firebase (backend сервер для подзагрузки сайта)
// связь реакта с базой данных
import Rebase from 're-base';
// база данных
import firebase from 'firebase/app';
require('firebase/database');

// создание базы данных
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDFcbyqb8xkC95p8gK70m1FEMN-XXA76wc",
    authDomain: "very-hot-burgers-7ce5e.firebaseapp.com",
    databaseURL: "https://very-hot-burgers-7ce5e-default-rtdb.europe-west1.firebasedatabase.app",
    
});

// связка с реактом
const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;