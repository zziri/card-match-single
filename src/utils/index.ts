import cat from "../img/cat.png";
import dragonfly from "../img/dragonfly.png";
import goldfish from "../img/goldfish.png";
import koala from "../img/koala.png";
import lizard from "../img/lizard.png";
import owl from "../img/owl.png";
import penguin from "../img/penguin.png";
import whale from "../img/whale.png";

import { shuffle, take } from "lodash-es";
import { Card } from "../model";

const cardImageList = [
  cat,
  dragonfly,
  goldfish,
  koala,
  lizard,
  owl,
  penguin,
  whale
];

function getShuffledCards(n: number): Card[] {
  const halfImages = getCardImageList(n);
  // const allImages = [...halfImages, ...halfImages];
  const allImages = shuffle([...halfImages, ...halfImages]);

  return Array.from({ length: n * n }, (_, index) => ({
    seq: index,
    imageSource: allImages.pop() || '',
    selected: false,
    matched: false,
  }));
}

function getCardImageList(size: number) {
  return take(cardImageList, size * size / 2);
}

function sleep(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

function finished(cards: Card[]) {
  const card = cards.find(c => !c.matched);
  return !card;
}

/**
 * 클릭된 카드가 두번째 선택된 카드
 */
function secondPick(cards: Card[], clickedCard: Card) {
  const selectedCard = cards.find(card => card.selected);
  return (selectedCard
    && selectedCard.seq !== clickedCard.seq
    && !clickedCard.selected);
}

/**
 * 클릭된 카드가 기존 선택된 카드와 매치
 */
function matchPick(cards: Card[], clickedCard: Card) {
  const selectedCard = cards.find(card => card.selected) ?? { seq: null, imageSource: null };
  return (selectedCard.seq !== clickedCard.seq
    && selectedCard.imageSource === clickedCard.imageSource);
}

function getSelectedCard(cards: Card[]) {
  const selectedCard = cards.find(card => card.selected);
  return selectedCard;
}

export { 
  getShuffledCards,
  getCardImageList,
  sleep,
  finished,
  secondPick,
  matchPick,
  getSelectedCard,
};
