import React from 'react';
import PropTypes, { object, string } from 'prop-types';
import { components } from 'react-select';

import SelectOption from '../SelectOption/SelectOption';

const OptionPart = props => {
  const { isSelected, data, isMulti } = props;
  const checkRenderKey = props.selectProps.checkRenderKey;
  const uppercase = props.selectProps.uppercase;

  return (
    <components.Option {...props}>
      <SelectOption
        isSelected={isSelected}
        data={data}
        isMulti={isMulti}
        checkRenderKey={checkRenderKey}
        uppercase={uppercase}
      />
    </components.Option>
  );
};

OptionPart.propTypes = {
  isSelected: PropTypes.bool,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(string),
    PropTypes.arrayOf(object)
  ]),
  data: PropTypes.oneOfType([PropTypes.arrayOf(object), PropTypes.object]),
  isMulti: PropTypes.bool,
  selectProps: PropTypes.object
};

export default OptionPart;
