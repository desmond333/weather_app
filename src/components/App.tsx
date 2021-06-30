import React from 'react';
import '../styles/App.css';

const App: React.FC = () => {
  return (
    <div className='app'>
        <div className='app__body'>
            <div className='app__item'>Город</div>
            <div className='app__item'>Температура</div>
            <div className='app__item'>Осадки</div>
        </div>
    </div>
  );
}

export {App};
