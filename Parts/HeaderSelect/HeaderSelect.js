import React from 'react';
import PropTypes, { object, string } from 'prop-types';
import cn from 'classnames';

import { findOptionByKey } from '../../helpers/helpers';

import { DropdownIndicatorPart, ClearIndicatorPart } from '../Parts';

import { Text } from '../../../Elements';

import classes from './HeaderSelect.module.scss';

const HeaderSelect = ({
  value,
  handleOpen,
  placeholder,
  clearable,
  clearValue,
  open,
  renderKey,
  options
}) => {
  return (
    <div
      className={cn(classes.header, open && classes.header_select)}
      onClick={handleOpen}
      role="button"
    >
      <>
        <button
          className={classes.visually_hidden}
          aria-label="open select menu"
        />
        {value && value.length > 0 ? (
          <Text className={cn(classes.placeholder, classes.placeholder_select)}>
            {value
              .map(item => findOptionByKey(item.value, options, renderKey))
              .join(', ')}
          </Text>
        ) : value && value.label ? (
          <Text className={cn(classes.placeholder, classes.placeholder_select)}>
            {value[renderKey]}
          </Text>
        ) : (
          <Text className={classes.placeholder}>{placeholder}</Text>
        )}
        <div className={classes.wrapControlButton}>
          {value && (value.length > 0 || value.label) && clearable && (
            <ClearIndicatorPart clearValue={clearValue} />
          )}
          <DropdownIndicatorPart selectProps={{ menuIsOpen: open }} />
        </div>
      </>
    </div>
  );
};

HeaderSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.arrayOf(object), PropTypes.object]),
  handleOpen: PropTypes.func,
  placeholder: PropTypes.string,
  clearable: PropTypes.bool,
  clearValue: PropTypes.func,
  open: PropTypes.bool,
  renderKey: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(string),
    PropTypes.arrayOf(object)
  ])
};

export default HeaderSelect;
