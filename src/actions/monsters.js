import RETRIEVE_MONSTERS from '../types';
import getMonsters, { getMonster } from '../api';



const setMonsters = (monsters) => ({
  type: RETRIEVE_MONSTERS,
  payload: monsters,
});

const getFiltered = (filter) => (dispatch) => {
  dispatch(setMonsters([]));
  getMonsters().then((monsters) => {
    dispatch(setMonsters(monsters.filter((monster) => monster.id)));
  });
};

const receiveMonsters = () => (dispatch) => {
  getMonsters().then((monsters) => {
    dispatch(setMonsters(monsters));
  });
};

const receiveMonsterDetails = (index) => (dispatch) => {
  getMonster(index).then((monsters) => {
    dispatch(setMonsters(monsters));
  });
};

export {
  setMonsters, receiveMonsters, getFiltered, receiveMonsterDetails,
};
