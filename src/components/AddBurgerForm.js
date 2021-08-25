import React from 'react';
// добавляем PropTypes для обозначения нужного типа данных
import PropTypes from 'prop-types';

// все бургеры должны храниться в галавном компоненте App, тк мы не можем передавать данные
// только от вышестоящего компонента к нижестоящему. От главного компонента к его дочерним

class AddBurgerForm extends React.Component {

    static propTypes = {
        addBurger: PropTypes.func
    }

    // создаем Ref ссылки на поля input для дальнейшей работы с введеными данными
    // другой способ это работа через state
    // потом добаввляем эти ссылки ref в input
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();

    createBurger = (event) => {
        // отменяем стандартное поведенеие - перезагрузку страницы
        event.preventDefault();
        // получение значения input через ref 
        console.log('add burger', this.nameRef.current.value);

        // создаем объект в котрый помещаем value всех полей
        // с помощью parseFloat переводим в цифровое значение
        const burger = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value) || 0,
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value,
        };
        // console.log(burger);
        // после того как мы добавиль метод из главного компонента в MenuAdmin
        // мы можем добавить его сюда через доступ к props компонента, находящегося выше
        this.props.addBurger(burger);

        // ощищаем форму после отправки
        // используем встроенный метод reset() для очистки формы
        // это возможно тк currentTarget является <form> 
        event.currentTarget.reset();
        
    }
    render() {
        return(
            // на форму вешаем обработчик событий на отправку формы
            <form className='burger-edit' onSubmit={this.createBurger}>
                <input ref={this.nameRef} name='name' type='text' placeholder='Name' autoComplete='off' />
                <input ref={this.priceRef} name='price' type='text' placeholder='Price' autoComplete='off' />
                <select ref={this.statusRef} className='status' name='status'>
                    <option value='available'>Доступно</option>
                    <option value='unavailable'>Убрать из меню</option>
                </select>
                <textarea ref={this.descRef} name='desc' placeholder='Desc' />
                <input ref={this.imageRef} name='image' type='text' placeholder='Image' autoComplete='off' />
                <button type='submit'>+ Добавить в меню</button>
            </form>
        )
    }
}

export default AddBurgerForm; 