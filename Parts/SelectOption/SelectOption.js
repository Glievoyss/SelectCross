import React from 'react';
import PropTypes, { object } from 'prop-types';
import cn from 'classnames';

import { Text } from '../../../Elements';

import classes from './SelectOption.module.scss';

const SelectOption = ({
  isSelected,
  data,
  isMulti,
  checkRenderKey,
  uppercase
}) => {
  const styleOption = data.className;

  return (
    <div
      className={cn(
        classes.optionWrap,
        !isMulti && isSelected && classes.optionWrap_select
      )}
    >
      {isMulti && (
        <div
          className={cn(
            classes.checkBox,
            typeof data.label === 'string'
              ? isSelected && classes.checkBox_selected
              : isSelected
              ? classes.checkBox_selected
              : classes.checkBox_hide
          )}
        >
          {isSelected && <div className={classes.arrow} />}
        </div>
      )}

      <Text
        className={cn(
          styleOption ? styleOption : classes.label,
          !isMulti && classes.label_noMulti,
          uppercase && classes.label_uppercase
        )}
      >
        {isSelected && typeof data.label !== 'string'
          ? data[checkRenderKey]
          : data.label}
      </Text>
    </div>
  );
};

SelectOption.propTypes = {
  isSelected: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.arrayOf(object), PropTypes.object])
    .isRequired,
  isMulti: PropTypes.bool,
  checkRenderKey: PropTypes.string,
  uppercase: PropTypes.bool
};

export default SelectOption;
