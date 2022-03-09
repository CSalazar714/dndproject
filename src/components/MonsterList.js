import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import getMonsters from '../api';
import MonsterCard from './MonsterCard';

import { setMonsters, getFiltered, receiveMonsterDetails } from '../actions/monsters';

const MonstersList = (props) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const monstersList = useSelector((state) => state.monsterReducer.monsters);
  const monsters = async () => {
    const creature = await getMonsters();
    dispatch(setMonsters(creature));
  };
  useEffect(() => {
    monsters();
  }, []);

  return (
    <div className="main">
      <div className="navbar">
        <h1 className="navbar-title">D&D</h1>
        <input type="text" className="filter-input" id="FilterInput" placeholder="Enter text" />
        <button
          type="button"
          className="filterBtn"
          onClick={(e) => {
            props.getFiltered(e.target.previousSibling.value.toLowerCase());
            setFilter(e.target.previousSibling.value.toLowerCase());
          }}
        >
          Filter
        </button>
        <Link to="/" className="resetBtn" onClick={() => { props.getFiltered(''); setFilter(''); document.getElementById('FilterInput').value = ''; }}>Reset</Link>
      </div>
      <div className=" monster-container">
        {monstersList.length === 1 && (
          <div className="monster-card">
            <Link to="/" className="Backbtn" onClick={() => { props.getFiltered(filter); }}>
            
            </Link>
            <MonsterCard
              key={monstersList[0].id}
              index={monstersList[0].id}
              name={monstersList[0].name}
              size={monstersList[0].size || ''}
              type={monstersList[0].type || ''}
              alignment={monstersList[0].alignment || ''}
              hit_points={monstersList[0].hit_points || 0}
              hit_dice={monstersList[0].hit_dice || ''}
              challenge={monstersList[0].challenge}/>
            </div>
        )}
        {monstersList.length > 1 && monstersList.map((monster, index) => (
          <div key={monster.id} className= 'monsterCardDark' >
            <Link
              key={monster.id}
              id={`${monster.id}-link`}
              to={{
                pathname: `/monsters/${monster.id}`,
                itemProps: {
                  index: monster.id,
                  name: monster.name,
                },
              }}
              className="monsterDetails"
              onClick={(e) => {
                props.receiveMonsterDetails(e.target.id);
              }}
            >
              <MonsterCard
                key={monster.id}
                index={monster.id}
                name={monster.name}
                challenge={monster.challenge}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  monsters: state.monsters,
});

const mapDispatchToProps = (dispatch) => ({
  setMonsters: () => dispatch(setMonsters),
  getFiltered: (filter) => dispatch(getFiltered(filter)),
  receiveMonsterDetails: (index) => dispatch(receiveMonsterDetails(index)),
});

MonstersList.propTypes = {
  getFiltered: PropTypes.func.isRequired,
  receiveMonsterDetails: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MonstersList);
