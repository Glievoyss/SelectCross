import React from 'react';
import classes from './DropdownIndicatorSearch.module.scss';
import { Icon } from '../../../Elements';

const DropdownIndicatorSearch = () => (
  <div className={classes.indicatorWrap}>
    <Icon size="16px" icon={'search'} color={'#3a5ba2'} />
  </div>
);

export default DropdownIndicatorSearch;
