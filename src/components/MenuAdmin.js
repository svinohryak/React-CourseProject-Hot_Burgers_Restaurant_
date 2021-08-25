import React from 'react';
// добавляем PropTypes для обозначения нужного типа данных
import PropTypes from 'prop-types';
import AddBurgerForm from './AddBurgerForm';
import EditBurgerForm from './EditBurgerForm';


class MenuAdmin extends React.Component {

    static propTypes = {
        burgers: PropTypes.object,
        deleteBurger: PropTypes.func,
        updateBurger: PropTypes.func,
        addBurger: PropTypes.func,
        loadSampleBurgers: PropTypes.func
    }

    render() {
        return(
            <div className='menu-admin'>
                <h2>Управление Меню</h2>
                {Object.keys(this.props.burgers).map((key) => {
                    return <EditBurgerForm 
                            key={key} 
                            index={key} 
                            deleteBurger={this.props.deleteBurger}
                            burger={this.props.burgers[key]} 
                            updateBurger={this.props.updateBurger}
                        />
                })}
                {/* передаем метод addBurger главного компонента App через props */}
                <AddBurgerForm addBurger={this.props.addBurger} />
                {/* кнопка загрузки всех бургеров сразу. Из заранее заготовленного объекта.
                Добавляем обработчик событий. Метод прописан в компоненте App (тк в нем в Satate хранятся бургеры) */}
                <button onClick={this.props.loadSampleBurgers}>Загрузить бургеры</button>
            </div>
        )
    }
}

export default MenuAdmin; 