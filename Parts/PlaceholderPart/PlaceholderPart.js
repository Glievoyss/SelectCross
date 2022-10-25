import React from 'react';
import PropTypes, { object, string } from 'prop-types';
import cn from 'classnames';

import { Text } from '../../../Elements';

import { findOptionByKey } from '../../helpers/helpers';

import classes from './PlaceholderPart.module.scss';

const PlaceholderPart = props => {
  const { value, renderKey, placeholder, uppercase } = props.selectProps;

  return (
    <Text
      className={cn(
        classes.placeholder,
        uppercase && value.length > 0 && classes.placeholder_uppercase,
        props.selectProps.value &&
          (value.length > 0 || value.label) &&
          classes.placeholder_select
      )}
    >
      {value && value.length > 0
        ? value
            .map(item => findOptionByKey(item.value, props.options, renderKey))
            .join(', ')
        : value && value.label
        ? findOptionByKey(value.value, props.options, renderKey)
        : placeholder}
    </Text>
  );
};

PlaceholderPart.propTypes = {
  uppercase: PropTypes.bool,
  selectProps: PropTypes.object,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(string),
    PropTypes.arrayOf(object)
  ])
};

export default PlaceholderPart;
