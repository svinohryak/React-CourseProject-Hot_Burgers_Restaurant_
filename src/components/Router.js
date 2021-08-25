import React from 'react';
// импортируем компонент Landing
import Landing from './Landing';
import App from './App';
import NotFound from './NotFound';
// импорт react routerа для веб приложений. Так же имеется для мобильных приложений
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Router = () => {
    return (
        <BrowserRouter>
            {/* Switch смотрит что мы вводим в адресной строке браузера и проверяет его на соответсвие
            с указаным в адресных маршрутах тэга Rout, и при совпадении рендерит указынный компонент */}
            <Switch>
                {/* прописываем каждый отдельный маршрут в тэге Rout 
                указывается путь и компонент, который должен рендериться
                Указываем этот компонент как точку вхожа в index.js*/}
                <Route exact path="/" component={Landing} />
                {/* маршрут для всех ресторанов. restauranId это любое название ресторана */}
                <Route path="/restaurant/:restaurantId" component={App} />
                {/* маршрут для адреса который не существует */}
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

// экспортируем его на index страницу
export default Router;

