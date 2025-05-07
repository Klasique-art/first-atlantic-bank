// components/ConfettiFall.jsx
import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

const ConfettiFall = ({ fire = false, numberOfPieces = 200, recycle = false }) => {
  const [width, height] = useWindowSize();

  return fire ? (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={numberOfPieces}
      recycle={recycle} // if true, loops; if false, it stops
      gravity={0.3}
      wind={0}
      tweenDuration={5000}
      initialVelocityY={30}
    />
  ) : null;
};

export default ConfettiFall;
