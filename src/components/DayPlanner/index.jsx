import React, { PropTypes } from 'react';

import './style.css';

// Base DayPlanner example page
const DayPlanner = ({test}) => {
  return (
    <div>
      <h1>
        Sample DayPlanner Page - TestValue is {test}
      </h1>
    </div>
  );
}

export default DayPlanner;
