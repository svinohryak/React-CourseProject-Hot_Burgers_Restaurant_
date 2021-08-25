import React from 'react';
// добавляем PropTypes для обозначения нужного типа данных
import PropTypes from 'prop-types';

class Shipment extends React.Component {

    static propTypes = {
        total: PropTypes.number
    }

    render() {
        // получаем значение total из props
        const {total} = this.props;
        // стоимость доставки
        const shipping = total > 0 && total < 500 ? 350 : 99;
        // если скидка на доставку то спан с эффектом (стиль указан)
        // если нет то обычный текст
        // вводим условие прям при присвоении переменной
        const shippingNeon = shipping === 99 ? (
            <span className='font-effect-neon total_wrap-cheap'>
                {shipping} ₽
            </span>
        ) : (
            <span>{shipping} ₽</span>
        );

        return (
            <div className='total'>
                <div className='total_wrap'>
                    <div>
                        <div>Доставка: {total > 0 ? shippingNeon : null}</div>
                        <div className='total_wrap-free'>
                            {total < 500 
                            ? `Закажите еще на ${500 - total} ₽ для доставки за 99 ₽` 
                            : null}
                        </div>
                    </div>

                    <div className='total_wrap-final'>
                        Итого: {total} ₽
                    </div>
                </div>
            </div>
        )
    }
}

export default Shipment;