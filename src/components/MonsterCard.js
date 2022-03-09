import React from 'react';
import PropTypes from 'prop-types';
import './CardCss.css'



const MonsterCard = (props) => {
  const {
    name, index, size, alignment, hit_dice: hitDice, hit_points: hitPoints, challenge,
  } = props;

  return (
    <div className="monsterCardContainer">
      <p id={index} className=" nameDisplay">{name || ''}</p>
      <p className="challenge">{`Challenge Rating: ${challenge || ''}`}</p>
      <div className="details-container">
        <p className="name-details">{`Size: ${size || ''}`}</p>
        <p className="name-details">{`Alignment: ${alignment || ''}`}</p>
        <p className="name-details">{`Hit Dice: ${hitDice || ''}`}</p>
        <p className="name-details">{`Hit Points: ${hitPoints || ''}`}</p>
      </div>
    </div>
  );
};

MonsterCard.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  size: PropTypes.string,
  alignment: PropTypes.string,
  hit_dice: PropTypes.string,
  hit_points: PropTypes.number,
  challenge: PropTypes.string.isRequired,
};

MonsterCard.defaultProps = {
  size: '',
  alignment: '',
  hit_dice: '',
  hit_points: 0,
};

export default MonsterCard;
