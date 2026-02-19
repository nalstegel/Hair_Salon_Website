import React from 'react';
import Gifts_Darila from '../components/Gifts_Darila';
import Gifts_Ponudbe from '../components/Gifts_Ponudbe';

const Gifts = () => {
  return (
    <div className="page-wrapper">
      <Gifts_Darila />
      <Gifts_Ponudbe />
    </div>
  );
};

export default Gifts;