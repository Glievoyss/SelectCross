import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';

import { Loading } from 'components/common/Elements/Elements';

import classes from './MenuPart.module.scss';

const MenuPart = ({ children, ...props }) => {
  const { selectLoader } = props.selectProps;

  return (
    <div className={classes.menu}>
      <components.Menu {...props}>
        {selectLoader ? <Loading /> : <>{children}</>}
      </components.Menu>
    </div>
  );
};

MenuPart.propTypes = {
  selectProps: PropTypes.object,
  children: PropTypes.object
};

export default MenuPart;
