import './Large-logo.scss';
import { FC } from 'react';
import pokerCardsImg from '../../assets/icons/poker-cards.svg';

export const LargeLogo: FC = () => {
  return (
    <div className="largeLogo">
      <img src={pokerCardsImg} alt="Poker cards" />

      <div className="largeLogo__title">
        <span>Poker</span>
        <span>Planning</span>
      </div>
    </div>
  );
};