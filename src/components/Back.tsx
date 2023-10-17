import { CSSProperties } from "react";

interface Props {
  imageSource: string
}

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

function Back({ imageSource }: Props) {
  return (
    <div style={customStyle}>
      <img src={imageSource} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default Back;
