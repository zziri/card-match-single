import { atom } from "recoil";
import { Card } from "../model";

const cardState = atom<Card[]>({
  key: 'cardState',
  default: [
    {
      seq: 0,
      imageSource: '',
      selected: false,
      matched: false
    }
  ]
});

const boardSizeState = atom<number>({
  key: 'boardSize',
  default: 4
});

const clickableState = atom<boolean>({
  key: 'clickableState',
  default: true
});

const finishedState = atom<boolean>({
  key: 'finishedState',
  default: false,
});

export {
  cardState,
  boardSizeState,
  clickableState,
  finishedState,
};