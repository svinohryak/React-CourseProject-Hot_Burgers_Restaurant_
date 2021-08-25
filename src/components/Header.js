import React from 'react';

// импортируем PropTypes для указания необходимого формата данных
import PropTypes from 'prop-types';

// если компонент не содержит никакой логики, а только отображает информацию
// его можно записывать не в виде класса, а в виде функции
// функция также может быть стрелочной
// const Header = props => (......)
function Header(props) {
    return(
        <header className='top'>
            <div className='wrap'>
                <div className='header-content'>

                    <div className='header-rating'>
                        <div className='header-rating_tag'>Рейтинг: </div>
                        <div className='header-rating_icon'>★★★★★</div>
                    </div>

                    <div className='header-divider'></div>
                    <h1 className='font-effect-fire-animation'>{props.title}</h1>
                    <h3>
                        <span>
                            Быстрая доставка горячих
                            <span className='sub-header'> #бургеров</span>
                        </span>
                    </h3>
                </div>
            </div>
        </header>
    );
}

// class Header extends React.Component {
//     render() {
//         return(
//             <header className='top'>
//                 <div className='wrap'>
//                     <div className='header-content'>

//                         <div className='header-rating'>
//                             <div className='header-rating_tag'>Рейтинг: </div>
//                             <div className='header-rating_icon'>★★★★★</div>
//                         </div>

//                         <div className='header-divider'></div>
//                         <h1 className='font-effect-fire-animation'>{this.props.title}</h1>
//                         <h3>
//                             <span>
//                                 Быстрая доставка горячих
//                                 <span className='sub-header'> #бургеров</span>
//                             </span>
//                         </h3>
//                     </div>
//                 </div>
//             </header>
//         )
//     }
// }

// указываем обязательный формат данных для передачи в компонент Header
// теперь в title если будет указан не string а номер или не будет ничего
// в консоле будет предупреждение о этом
Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header; 