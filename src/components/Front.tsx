import { CSSProperties } from "react";

const customStyle: CSSProperties = {
  border: '1px solid rgba(0, 0, 0, 0.3)',
  margin: 5,
  padding: 5,
  // width: '100px',
  // height: '105px',
  width: '60px',
  height: '60px',
  borderRadius: '10px',
  boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.3)'
};

function Front() {
  return (
    <div style={customStyle}>
    </div>
  );
}

export default Front;
