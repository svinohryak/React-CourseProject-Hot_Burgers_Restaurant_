// имортируем react с указанием пакета
import React from 'react';
// импортируем метод, отдевачающий за рендеринг компонентов на странице
// после этого можно использовать метод render()
import { render } from 'react-dom';
// компоненты буду храится в отдельных файлах в папке components
// импортируем компоненты для их использования на этой странице
// import Landing from './components/Landing';
// import App from './components/App';

// делаем компонент Router входной точкой вместо App
import Router from './components/Router';
// импортируем стили из отдельного файла
import './css/style.css'; 


// render(<App />, document.getElementById('root'));
render(<Router />, document.getElementById('root'));