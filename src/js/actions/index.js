
export const ADD_CHOSEN_DOC = 'ADD_CHOSEN_DOC';
export const ADD_CHOSEN_FIELD = 'ADD_CHOSEN_FIELD';
export const ADD_CHOSEN_AREA = 'ADD_CHOSEN_AREA';


export function addChosenDoc(name) {
  return { type: ADD_CHOSEN_DOC, name: name };
}

export function addChosenField(name) {
  return { type: ADD_CHOSEN_FIELD, name: name };
}

export function addChosenArea(name) {
  return { type: ADD_CHOSEN_AREA, name: name };
}