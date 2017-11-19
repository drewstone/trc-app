import React from 'react';
export default function User({ screenActions, marketActions, decentralState }) {
  return (
    <div>
      <h1>Welcome back {decentralState.ethereum.address}</h1>
    </div>
  );
}
