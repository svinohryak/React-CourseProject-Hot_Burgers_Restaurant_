// имортируем react с указанием пакета
import React from "react";
// импортируем данные о ресторанах
import restaurants from "../sample-restaurants";
// добавляем PropTypes для обозначения нужного типа данных
import PropTypes from 'prop-types';

// создаем компонент через class
// внутри return должен быть один головной элемент
// можно обернуто в div, либо <React.Fragment> либо просто в пустой тэг <> все тут </>
// в нашем случае можно просто перенести кнопку внутрь дива restaurant_select
// так не образуетс пустого ненужного div на странице
// return должен быть со скобками, когда есть вложенность
class Landing extends React.Component {

  static propTypes = {
    history: PropTypes.object
  }

  // создаем state (объект в котором хранятся нужные для изменения данные)
  state = {
    display: false,
    title: "",
    url: "",
  };

  // пишем стрелочную функцию тк this стрелочной функции будет являться Landing
  displayList = () => {
    // тут импользуется деструкторизация
    const { display } = this.state;
    // с помощью setState меняем значение display на противоположное
    this.setState({ display: !display });
  };

  getTitle = (restaurant) => {
    const { title, url } = restaurant;
    // сохраняем текущие значения названия и ссылки в state
    // меням display на false, чтобы табличка с ресторанами исчезала
    this.setState({ title: title, url: url, display: false });
  };

  // переход на выбранный ресторан
  // из объекта state мы сохранеем url (туда он помещается при выборе ресторана - метод getTitle)
  // используем метод push(), находящийся в history у Router (после создания маршрутизации)
  // push() (под капотом pushState() JS) позволяет работать БЕЗ ПЕРЕЗАГРУЗКИ страницы
  goToRestaurant = () => {
      const {url} = this.state;
      // const url = this.state.url;
      this.props.history.push(`/restaurant/${url}`);
  }

  render() {
    // console.log(restaurants);
    // restaurants.map(rest => console.log(rest.title));

    return (
      <div className="restaurant_select">
        <div className="restaurant_select_top">
          {/* вешаем событие на див с выбором ресторанов. Указываем метод прописанный в этом же классе Landing, для этого и нужен this */}
          <div
            onClick={this.displayList}
            className="restaurant_select_top-header  font-effect-outline"
          >
            {/* через inline conditional выводим название ресторана или строку Выбери ресторан, если ничего не выбрано */}
            {this.state.title ? this.state.title : "Выберите ресторан"}
          </div>
          <div className="arrow_picker">
            <div className="arrow_picker-up"></div>
            <div className="arrow_picker-down"></div>
          </div>
        </div>

        {/* скобки {} дают понять реакту, что внутри используется JS.
                    помещаем весь этот код в condition ( ? :) */}
        {this.state.display ? (
          <div className="restaurant_select_bottom">
            <ul>
              {/* при переберании массивов с помощью map и тп, нужно использовать key={неповторяющееся имя} */}
              {restaurants.map((restaurant) => {
                return (
                  <li
                    onClick={() => this.getTitle(restaurant)}
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
        {this.state.title && !this.state.display ? (
          <button onClick={this.goToRestaurant}>Перейти в ресторан</button>
        ) : null}
      </div>
    );
  }
}

// экспортируем компонент чтобы его можно было использовать в index.js
// указывая его название
export default Landing;
