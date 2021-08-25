import React from 'react';
// добавляем PropTypes для обозначения нужного типа данных
import PropTypes from 'prop-types';
import Shipment from './Shipment';
// импорт пакета необходимого для анимации
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {

    static propTypes = {
        burgers: PropTypes.object,
        order: PropTypes.object,
        deleteFromOrder: PropTypes.func
    }

    // создаем render function - нужна для облегчения чтения кода
    // когда следует избавиться от части логики в return 
    renderOrder = (key) => {
        // получаем бургер из списка всех бургеров
        const burger = this.props.burgers[key];
        // получаем количество заказыанных бургеров
        const count = this.props.order[key];

        const isAvailable = burger && burger.status === 'available';

        // переменная со свойствами CSSTransition. Просто для удобства. Это не обязательно
        const transitionOptions = {
            classNames: 'order',
            key: key,
            timeout: {enter: 500, exit: 500}
        }

        //  burger не успевают подгрузиться с база и из-за этого появляется
        // "Извините временно не доступно", вводим дополнительно проверку
        // и при отсутствии бургеров не рендерем ничего
        if(!burger) return null;

        if(!isAvailable) {
            return (
                //для работы с анимацией
                // transition тут должен совпадать со значениями, указанными в css
                <CSSTransition classNames='order' key={key} timeout={{enter: 500, exit: 500}}>
                    <li className='unavailable' key={key}>
                        Извините, {burger ? burger.name : "бургер"} временно недоступен
                    </li>
                </CSSTransition>
            );
        }
        return(
            //для работы с анимацией
            // используем spread чтобы передать свойства из переменной
            // это другой вариант. Можно и как выше
            <CSSTransition {...transitionOptions}>
                <li key={key}>
                    <span>
                        <TransitionGroup component='span' className='count'>
                            {/* из-за того что key={count} будет одновременно и старое значение и новое
                            и на них будут действовать разные стили */}
                            <CSSTransition classNames='count' key={count} timeout={{enter: 500, exit: 500}}>
                                <span>{count}</span>
                            </CSSTransition>
                        </TransitionGroup>

                        шт. {burger.name}
                        <span> {count * burger.price} ₽</span>
                        <button className='cancellItem' onClick={() => this.props.deleteFromOrder(key)}>&times;</button>
                    </span>
                </li>
            </CSSTransition>
        )
    }

    render() {
        // получаем бургеры которые мы заказываем
        const orderIds = Object.keys(this.props.order)
        // общая стоимость заказа
        const total = orderIds.reduce((prevTotal, key) => {
            // получаем бургер из списка всех бургеров
            const burger = this.props.burgers[key];
            // получаем количество заказыанных бургеров
            const count = this.props.order[key];

            // проверяем доступен ли бургер
            // isAvailable будет true если статус "доступен"
            // если нет доступа то возвращается предыдущее значение
            const isAvailable = burger && burger.status === 'available';
            if(isAvailable) {
                return prevTotal + burger.price * count;
            }
            return prevTotal;
            
        }, 0)

        return(
            <div className='order-wrap'>
                <h2>Ваш заказ</h2>

                {/* работа с анимацией. component='ul' значит что в HTML transitionGroup будет отображаться как ul */}
                <TransitionGroup component='ul' className='order'>{orderIds.map(this.renderOrder)}</TransitionGroup>
                
                {/* проверка того есть ли что-то в заказе или нет
                Передача total в props для передачи в компонент Shipment */}
                {total > 0 ? (
                    <Shipment total={total} />
                ) : (
                    <div className='nothingSelected'>
                        Выберите блюдо и добавьте к заказу
                    </div>
                ) }

            </div>
        )
    }
}

export default Order; 