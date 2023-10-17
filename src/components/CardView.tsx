import ReactCardFlip from 'react-card-flip';
import Front from './Front';
import Back from './Back';
import { Card } from '../model';
import { useRecoilState } from 'recoil';
import { cardState, clickableState } from '../atom';
import { isNil } from 'lodash-es';
import { getSelectedCard, matchPick, secondPick, sleep } from '../utils';

interface Props {
  card: Card
}

function CardView({ card }: Props) {
  const [cards, setCards] = useRecoilState<Card[]>(cardState);
  const [clickable, setClickable] = useRecoilState<boolean>(clickableState);

  function matching(cards: Card[], selectedCard?: Card) {
    setCards(
      cards.map(c => {
        if (c.seq === card.seq || c.seq === selectedCard?.seq) {
          return {
            ...c,
            selected: false,
            matched: true,
          }
        } else {
          return c;
        }
      })
    );
  }

  async function unmatching(cards: Card[]) {
    await sleep(1000);
    setCards(
      cards.map(c => ({ ...c, selected: false }))
    );
  }

  async function onCardClick(e: any) {
    e.preventDefault();
    if (isNil(card) || card.matched || card.selected) {
      return;
    }

    setClickable(false);

    const updatedCards = cards.map(c => ({ ...c, selected: c.seq === card.seq ? true : c.selected }));
    const selectedCard = getSelectedCard(cards);

    setCards(updatedCards);

    if (matchPick(cards, card)) {
      await matching(updatedCards, selectedCard);
    } else if (secondPick(cards, card)) {
      await unmatching(updatedCards);
    }

    setClickable(true);
  }

  return (
    <div style={{
      WebkitTapHighlightColor: 'transparent'
    }}onClick={clickable ? onCardClick : () => { }}>
      <ReactCardFlip isFlipped={card?.selected || card?.matched} flipDirection="horizontal">
        <Front />
        <Back imageSource={card?.imageSource} />
      </ReactCardFlip>
    </div>

  );
}

export default CardView;

