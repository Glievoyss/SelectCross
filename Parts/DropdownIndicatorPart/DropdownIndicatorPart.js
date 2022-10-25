import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../../../Elements';

import classes from './DropdownIndicatorPart.module.scss';

const DropdownIndicatorPart = props => {
  const { menuIsOpen } = props.selectProps;
  const rotateDeg = {
    transform: `rotate(${180}deg)`
  };
  return (
    <div className={classes.indicatorWrap}>
      <Icon
        size="16px"
        icon={'arrow'}
        color={'#3a5ba2'}
        style={menuIsOpen && rotateDeg}
      />
    </div>
  );
};

DropdownIndicatorPart.propTypes = {
  selectProps: PropTypes.object
};

export default DropdownIndicatorPart;
