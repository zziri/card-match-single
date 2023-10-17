import Modal from 'react-modal';
import { useRecoilValue } from 'recoil';
import { finishedState } from '../atom';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { sleep } from '../utils';

const modalStyle: ReactModal.Styles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const buttonStyle: CSSProperties = {
  // position: 'absolute',
  // left: '50%',
  // right: 'auto',
  // paddingBottom: '5px',
  // transform: 'translate(-50%, -50%)',
}

const h3Style: CSSProperties = {
  // margin: '0px 0px 0px 0px',
  // paddingBottom: '19px'
};

Modal.setAppElement('#root');

function FinishModal() {
  const finished = useRecoilValue(finishedState);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const asyncEffect = async () => {
      if (finished) {
        await sleep(250);
        setOpen(true);
      }
    }
    asyncEffect();
  }, [finished]);

  function closeModal() {
    window.location.reload();
  }

  return (
    <div>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="Finished Modal"
      >
        <div style={{position: 'relative'}}>
          <h3 style={h3Style}>게임 종료!</h3>
        </div>
      </Modal>
    </div>
  );
}

export default FinishModal;