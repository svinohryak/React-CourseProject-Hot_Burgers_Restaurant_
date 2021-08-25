import React from 'react';
// добавляем PropTypes для обозначения нужного типа данных
import PropTypes from 'prop-types';

class EditBurgerForm extends React.Component {

    static propTypes = {
        burger: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            desc: PropTypes.string,
            status: PropTypes.string
        }),
        index: PropTypes.string,
        updateBurger: PropTypes.func,
        deleteBurger: PropTypes.func
    }

    handleChange = event => {

        // создаем объект, в который передаем все свойства бургеров
        // и меняем свойство name
        const updatedBurger = {
            ...this.props.burger,
            // используем "вычесляемое свойство"
            // в [] выбранный элемент по имене и мы изменяем его value
            [event.currentTarget.name]: event.currentTarget.name === 'price'
            ? parseFloat(event.currentTarget.value) || 0
            : event.currentTarget.value   
        };

        this.props.updateBurger(this.props.index, updatedBurger);
        

    }

    render() {
        return(
            <div className='burger-edit'>
                <input onChange={this.handleChange} name='name' value={this.props.burger.name} type='text'  autoComplete='off' />
                <input onChange={this.handleChange} name='price' value={this.props.burger.price} type='text' placeholder='Price' autoComplete='off' />
                <select onChange={this.handleChange} className='status' name='status' value={this.props.burger.status}>
                    <option value='available'>Доступно</option>
                    <option value='unavailable'>Убрать из меню</option>
                </select>
                <textarea onChange={this.handleChange} name='desc'  value={this.props.burger.desc} placeholder='Desc' />
                <input onChange={this.handleChange} name='image'  value={this.props.burger.image} type='text' autoComplete='off' />

                <button onClick={() => this.props.deleteBurger(this.props.index)}>Удалить из меню</button>
            </div>
        )
    }
}

export default EditBurgerForm;