import React from 'react';

import Header from './Header';
import Order from './Order';
import MenuAdmin from './MenuAdmin';
// импортируем подготовленные бургеры
import sampleBurgers from '../sample-burgers';
import Burger from './Burger';

import base from '../base';

// добавляем PropTypes для обозначения нужного типа данных
import PropTypes from 'prop-types';

// в объекте state этого главного компонента App, хранятся все данные о бургерах и заказе
// все данные меняются при помощи специалтных метолов и они меняются сразу
// для всех компонентов в которых они есть 
class App extends React.Component {

    // все свойства будут находится в галавном классе App, и не будут создаваться в каждом отдельном экземпляре этого класса
    // указываем типы данных при помощи PropTypes
    // указываем обязательный формат данных для передачи в компонент
    static propTypes = {
        match: PropTypes.object
    }

// храним наши бургеры  и заказы в state
    state = {
        burgers: {},
        order: {}
    }

    // при каждой зашрузки на страницу происходит синхронизация 
    // базы данных и burgers
    // Так же тут происходит контроль загрузки из LocalStorage тк
    // это должно происходить при рендеринге компонента
    componentDidMount() {
        // путь до базы
        // в объекте указываем то, что нужно синхронизировать 
        // тут ref служит для связи с базой
        const {params} = this.props.match;

        // localStorage
        const localStorageRef = localStorage.getItem(params.restaurantId)
        if(localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)});
        }
        

        this.ref = base.syncState(`${params.restaurantId}/burgers`, {
            context: this,
            state: 'burgers'
        });
    }

    // метод срабатывающий при обновлении, в нашем случае при добавлении бургера в заказ
    // тут будем сохранять в localStorage данные order для сохранения заказа
    // Загрузки из LocalStorage будет происходить в componentDidMount
    componentDidUpdate() {
        // в качестве ключа используется url ресторана
        const {params} = this.props.match;
        localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order))
    }

    // метод срабатывает когда мы переходим на другую страницу
    // он очищает сокеты
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    // метод для добавления бургеров в state
    // создаем его здесь (в галавном компоненте) затем передаем ниже в
    // MenuAdmin, а затем используем в AddBurgerForm
    // чтобы передать этот метод ниже по уровню и использовать его в MenuAdmin
    // нужно ввести его сдесь в методе render (смотри иже)
    addBurger = (burger) => {
        console.log('addBurger', burger);
        // В React принято не изменять старый объект, а создавать новый
        // 1. Делаем копию объекта state
        const burgers = {...this.state.burgers};
        // 2. Добавляем новый бургер в переменную burgers 
        // при помощи Date.now() создаем уникальный ключ для каждого бургера
        // Date.now() возвращает уникальную временную метку в милисекундах. Делаем это таким образом для экономии времени
        burgers[`burger${Date.now()}`] = burger;
        // 3. Записываем новый burgers в state через setState
        this.setState({burgers: burgers});
    };

    // метод для EditBurger для сохранения обновления в форме в state
    updateBurger = (key, updatedBurger) => {
        const burgers = { ...this.state.burgers };
        // обновляем нужный бургер
        burgers[key] = updatedBurger;
        // записываем обновленный бургер в state
        this.setState({ burgers });
    };

    deleteBurger = (key) => {
        const burgers = {...this.state.burgers};
        // удаляем бургер
        // делается таким способом чтобы корректно работал Firebase
        burgers[key] = null;
        this.setState({burgers});
    }

    // Метод добавляющий все бургеры из заранее подготовленного объекта
    // метод будет использоваться в MenuAdmin, но пишется тут, тк State тут
    // чтобы передать этот метод ниже по уровню и использовать его в MenuAdmin
    // нужно ввести его сдесь в методе render (смотри иже)
    loadSampleBurgers = () => {
        this.setState({burgers: sampleBurgers});
    }

    // Добавление бургеров в заказ
    // принимает ключ бургера, который добавляем в заказ
    addToOrder = (key) => {
        // делаем копию объекта state
        const order = {...this.state.order};
        // добавляем ключ к заказу со значением 1, либо прибавить еще один к заказу
        order[key] = order[key] + 1 || 1;
        // обновляем state
        this.setState({order});
    }


    deleteFromOrder = key => {
        const order = {...this.state.order};
        // тк с Firebase тут связи нет можно удалять таким способом
        delete order[key];
        this.setState({order});
    }

    render() {
        return(
            <div className='burger-paradise'>
                <div className='menu'>
                    {/* строка передается в кавычках, все остальное в {}
                    После введения этих аргументов они становятся свойствами объекта
                    props компонента Header */}
                    <Header title='Very Hot Burger' />
                    <ul className='burgers'>
                        {/* метод Object.keys() возвращает массив с ключами объекта 
                        Рендарим добавленные бургеры
                        */}
                        {Object.keys(this.state.burgers).map(key => {
                           return <Burger 
                           key={key}
                           index={key}
                           addToOrder={this.addToOrder}
                           details={this.state.burgers[key]}
                           />
                        })}
                    </ul>
                </div>
                {/* передаем в Order объекты burgers и order. После этого они доступны в его props */}
                <Order burgers={this.state.burgers} order={this.state.order} deleteFromOrder={this.deleteFromOrder}/>
                {/* добавляем метод addBurger через props (props главного элемента доступны дочерним)
                И передаем его еще ниже к компоненту AddBurger, который находится внутри MenuAdmin.
                Передаем объект с бургерами в МенюАдмин для использования в EditBurgers */}
                <MenuAdmin addBurger={this.addBurger} 
                    loadSampleBurgers={this.loadSampleBurgers} 
                    burgers={this.state.burgers} 
                    updateBurger={this.updateBurger}
                    deleteBurger={this.deleteBurger}
                />
            </div>
        )
    }
}

export default App; 