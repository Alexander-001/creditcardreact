import React, { useState } from 'react';
import logoVisa from './visa.png';
import './App.css';


const App = () => {

  const [backgroundCard, setBackgroundCard] = useState('card background-first__card');
  const [fullName, setFullName] = useState('');
  const [targetNumber, setTargetNumber] = useState('');
  const [expired, setExpired] = useState('');
  const [code, setCode] = useState('');
  const [changeCard, setChangeCard] = useState(false);

  const onChangeTargetNumber = (value) => {
    if (value.length >= 1 && value.length < 17) {
      let valueCharacter = value.match(/.{1,4}/g);
      setTargetNumber(valueCharacter.join(' '));
    }
  }

  const onChangeExpired = (value) => {
    const valueSplit = value.split('-');
    const year = valueSplit[0].slice(-2);
    const month = valueSplit[1];
    setExpired(`${month}/${year}`);
  }

  const changeCardPosition = () => {
    if (fullName !== '' && targetNumber !== '', expired !== '') {
      setChangeCard(!changeCard);
    }
  }

  return (
    <div className="container">
      <div className="container-cards">
        {!changeCard ? (
          <div className={backgroundCard}>
            <p>Número de tarjeta</p>
            <p className="card__text">
              {targetNumber ? targetNumber : '1111 1111 1111 1111'}
            </p>
            <p>Fecha de expiración</p>
            <p className="card__text">
              {expired ? expired : '00/00'}
            </p>
            <p className="card__text card-name">
              {fullName ? fullName : 'Card Name'}
            </p>
            <img className="card__logo-visa" src={logoVisa} />
          </div>
        ) : (
          <div className={backgroundCard}>
            <div className="card__strip"></div>
            <div className="card__signature"></div>
            <div className="card__ccv">{code ? code : '000'}</div>
          </div>
        )}
      </div>
      <div className="options-colors">
        <button className="first-button button" onClick={() => setBackgroundCard('card background-first__card')}></button>
        <button className="second-button button" onClick={() => setBackgroundCard('card background-second__card')}></button>
        <button className="third-button button" onClick={() => setBackgroundCard('card background-third__card')}></button>
        <button className="fourth-button button" onClick={() => setBackgroundCard('card background-fourth__card')}></button>
      </div>
      <form action="submit" className="options-form">
        <input
          type="text"
          placeholder="Nombre completo"
          onChange={(e) => setFullName(e.target.value)} />
        <input
          type="number"
          placeholder="Numero de tarjeta"
          onChange={(e) => onChangeTargetNumber(e.target.value)}
          maxLength={16}
        />
        <div className="content-inputs">
          <input
            type="month"
            placeholder="Expiración (MM/YY)"
            className="expiration"
            onChange={(e) => onChangeExpired(e.target.value)}
          />
          {fullName !== '' && targetNumber !== '' && expired !== '' ? (
            <input
              type="number"
              placeholder="CVV"
              className="cvv"
              onChange={(e) => setCode(e.target.value)}
              onClick={() => changeCardPosition()}
              max={999}
            />
          ) : (
            <input
              type="number"
              placeholder="CVV"
              className="cvv"
              disabled={true}
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
