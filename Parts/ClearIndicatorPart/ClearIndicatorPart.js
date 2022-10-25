import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Button } from '../../../Elements';

import classes from './ClearIndicatorPart.module.scss';

const ClearIndicatorPart = props => {
  const { clearValue } = props;

  const handleClear = () => {
    if (Object.keys(props).length > 1) {
      const { setTrigger, trigger } = props.selectProps;
      if (setTrigger) {
        setTrigger(!trigger);
      }
    }
    clearValue();
  };

  return (
    <Button
      className={classes.clear}
      onClick={handleClear}
      aria-label={`clear select`}
      tabIndex="-1"
    >
      <Icon
        icon={'closeCircle'}
        className={classes.icon}
        size="16px"
        aria-hidden="true"
      />
    </Button>
  );
};

ClearIndicatorPart.propTypes = {
  clearValue: PropTypes.func.isRequired,
  selectProps: PropTypes.object
};

export default ClearIndicatorPart;
