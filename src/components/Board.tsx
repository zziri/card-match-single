import { useRecoilState, useSetRecoilState } from "recoil";
import CardView from "./CardView";
import { boardSizeState, cardState, clickableState, finishedState } from "../atom";
import { useEffect, useState } from "react";
import { finished, getShuffledCards, sleep } from "../utils";
import { Card } from "../model";

function Board() {
  const [boardSize] = useRecoilState<number>(boardSizeState);
  const [cards, setCards] = useRecoilState<Card[]>(cardState);
  const [boardRender, setBoardRender] = useState<number>(0);
  const setClickable = useSetRecoilState<boolean>(clickableState);
  const setFinished = useSetRecoilState(finishedState);

  const n = cards.length / boardSize;
  const rows = Array.from({ length: n }, (_, index) => index);
  const columns = Array.from({ length: n }, (_, index) => index);

  const showInOrder = async () => {
    for (let i = 0; i < cards.length; i++) {
      const newCards = cards.map(card => card.seq <= i ? { ...card, selected: true } : { ...card });
      setCards(newCards);
      await sleep(200);
    }
  };

  const hideAll = () => {
    setCards(
      cards.map(card => {
        return { ...card, selected: false };
      })
    );
  };

  useEffect(() => {
    if (finished(cards)) {
      setFinished(true);
    }
  })

  useEffect(() => {
    const shuffledCards = getShuffledCards(boardSize);
    setCards(shuffledCards);
    setBoardRender(boardRender + 1);
  }, [boardSize]);

  useEffect(() => {
    if (boardRender === 0) {
      return;
    }
    const asyncEffect = async () => {
      setClickable(false);
      await showInOrder();
      await sleep(1000);
      hideAll();
      setClickable(true);
    };
    asyncEffect();
  }, [boardRender]);

  let seq = 0;

  return (
    <div>
      {rows.map((row) => (
        <div key={row} style={{ display: 'flex' }}>
          {columns.map((col) => (
            <CardView key={col} card={cards[seq++]} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
