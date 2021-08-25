import React from 'react';
// добавляем PropTypes для обозначения нужного типа данных
import PropTypes from 'prop-types';

class Burger extends React.Component {

    // все свойства будут находится в галавном классе Burger, и не будут создаваться в каждом отдельном экземпляре этого класса
    // указываем типы данных при помощи PropTypes
    // метод shape нужен для указания данных для свойств внутри объекта. Так же можно просто указать object
    static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            desc: PropTypes.string,
            status: PropTypes.string
        }),
        index: PropTypes.string,
        addToOrder: PropTypes.func
    };

    // помещаем по клику бургеры в state -> order
    // index создавался в details и равен ключу бургера
    handleClick = () => {
        this.props.addToOrder(this.props.index)
    }

    render() {
        // используя деструктурирование создаем пременные с информацией из 
        // объекта details
        const { image, name, price, desc, status } = this.props.details;

        // если значение status равно available, то значение isAvalable будет true
        const isAvailable = status === 'available';
        return(
            <li className='menu-burger'>
                <div className='image-container'>
                    {/* ссылку на картинку берем из объекта details созданного при добавлении бургера
                    src={this.props.datails.image} либо удобнее использовать пременные
                    созданные ранее */}
                    <img src={image} alt={name} />
                </div>

                <div className='burger-details'>
                    <h3 className='burger-name'>{name}
                        <span className='price'>{price} ₽</span>
                    </h3>
                    <p>{desc}</p>
                    {/* свойство disabled будет равняться true если isAvailable будет false
                    это свойство делает кнопку неактивной */}
                    <button
                    onClick={this.handleClick} 
                    className='buttonOrder' 
                    disabled={!isAvailable}>
                        {isAvailable ? 'Заказать' : 'Временно нет'}
                        </button>
                </div>
            </li>
        )
    }
}

export default Burger;