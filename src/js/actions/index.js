
export const ADD_CHOSEN_DOC = 'ADD_CHOSEN_DOC';

export function addChosenDoc(name) {
  return { type: ADD_CHOSEN_DOC, name: name };
}