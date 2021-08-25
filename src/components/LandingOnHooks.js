// имортируем react с указанием пакета
// импорт hook useState
import React, { useState } from "react";
import restaurants from "../sample-restaurants";
import PropTypes from 'prop-types';

// для работы с Хуком весь return помещаем в функцию Landing
// также помещаем сюда и методы

const Landing = (props) => {

    // смотрим что нужно изменять в state. Тут только для этого
    // state = {
    //     display: false,
    //     title: "",
    //     url: "",
    //   };

    // 1- состояния; 2 - функция, которая обновляет это состояние
    // начальное значение укахывается в скобках - false
    const [ display, toggleDisplay] = useState(false);
    // начальное значение - пустая строка
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const displayList = () => {
        // используя созданную функцию указываем какое должно быть значение
        // в нашем случае меняям на противоположное значение display
        toggleDisplay(!display);
      };
    
    const getTitle = (restaurant) => {
        const { title, url } = restaurant;
        // this.setState({ title: title, url: url, display: false });
        // изменям значения вместо использования setState путем использования 
        // функция созданных в хуках
        setTitle(title);
        setUrl(url);
        toggleDisplay(false);
      };
    
    const  goToRestaurant = () => {
        //   const {url} = this.state;
          props.history.push(`/restaurant/${url}`);
      }
    

    return (
        <div className="restaurant_select">
          <div className="restaurant_select_top">
            {/* вешаем событие на див с выбором ресторанов. Указываем метод прописанный в этом же классе Landing, для этого и нужен this */}
            <div
              onClick={displayList}
              className="restaurant_select_top-header  font-effect-outline"
            >
              {/* через inline conditional выводим название ресторана или строку Выбери ресторан, если ничего не выбрано */}
              {title ? title : "Выберите ресторан"}
            </div>
            <div className="arrow_picker">
              <div className="arrow_picker-up"></div>
              <div className="arrow_picker-down"></div>
            </div>
          </div>
  
          {/* скобки {} дают понять реакту, что внутри используется JS.
                      помещаем весь этот код в condition ( ? :) */}
          {display ? (
            <div className="restaurant_select_bottom">
              <ul>
                {/* при переберании массивов с помощью map и тп, нужно использовать key={неповторяющееся имя} */}
                {restaurants.map((restaurant) => {
                  return (
                    <li
                      onClick={() => getTitle(restaurant)}
                      key={restaurant.id}
                    >
                      {restaurant.title}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
  
          {/* кнопка отображается только если ресторан выбран  */}
          {title && !display ? (
            <button onClick={goToRestaurant}>Перейти в ресторан</button>
          ) : null}
        </div>
      );
}

// прописываем propTypes в функциональном компаненте
Landing.propTypes = {
    history: PropTypes.object
};

// тк уже есть другой Landing созданный через class
// а этот сделан для примера использования хуков 
// export default Landing;
