// If need to show in placeholder the same that is in list use renderKey = 'label'

import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import PropTypes, { object, string } from 'prop-types';

import { createOptions } from './helpers/helpers';
import { Heading, Hint } from '../../Elements/Elements';
import {
  DropdownIndicatorPart,
  DropdownIndicatorSearch,
  ClearIndicatorPart,
  OptionPart,
  PlaceholderPart,
  HeaderSelect,
  MenuPart
} from './Parts/Parts';
import { selectStyles, selectStylesSearch } from './Parts/selectStyles';

import classes from './SelectDropDown.module.scss';

const SelectDropDown = ({
  placeholder,
  multi = false,
  options,
  label,
  clearable = true,
  searchable,
  searchKeys = ['value'],
  input,
  renderKey = 'value',
  checkRenderKey = 'value',
  className,
  autoFocus,
  tooltip,
  reload = false,
  closeTrigger,
  selectLoader,
  name,
  isDisabled,
  uppercase,
  classTitle
}) => {
  const [open, setOpen] = useState(false);
  const { value, onChange } = input;
  const node = useRef();
  const searchRef = useRef();
  const [list, setList] = useState([]);
  const [trigerGetOptions, setTrigerGetOptions] = useState(false);
  const [searchText, setSearchText] = useState('');

  const { t } = useTranslation(['activity']);

  // if this attribute is present, then Select will
  // work like a cross and make a request to close select
  const { trigger, setTrigger } = closeTrigger
    ? closeTrigger
    : { trigger: undefined, setTrigger: undefined };

  useEffect(() => {
    if (reload === false) {
      if (options && options.length > 0 && !trigerGetOptions) {
        setTrigerGetOptions(true);
        setList(
          options && options.length === 0
            ? undefined
            : options && !options[0].value
            ? createOptions(options)
            : options
        );
      }
    } else {
      setList(
        options && options.length === 0
          ? undefined
          : options && !options[0].value
          ? createOptions(options)
          : options
      );
    }
    // eslint-disable-next-line
  }, [options]);

  useEffect(() => {
    if (searchable) {
      if (open) {
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', escAndTabFunction);
      } else {
        setTrigger && setTrigger(!trigger);
      }
      return () => {
        document.removeEventListener('mousedown', handleClick);
        document.removeEventListener('keydown', escAndTabFunction);
      };
    }

    // eslint-disable-next-line
  }, [open]);

  const escAndTabFunction = event => {
    if (event.code === 'Escape' || event.code === 'Tab') {
      setOpen(false);
      setSearchText('');
    }
  };

  const handleClick = e => {
    if (
      node.current.contains(e.target) ||
      searchRef.current.contains(e.target)
    ) {
      return;
    }
    setOpen(false);
    setSearchText('');
  };

  const onSelectChange = items => {
    if (multi) {
      if (items) {
        onChange(
          !name
            ? items.map(item => {
                return item.value;
              })
            : {
                target: name,
                value: items.map(item => {
                  return item.value;
                })
              }
        );
      } else {
        onChange(!name ? [] : { target: name, value: [] });
      }
    } else {
      items
        ? onChange(!name ? items.value : { target: name, value: items.value })
        : onChange(!name ? '' : { target: name, value: '' });
    }
  };

  const clearValue = () => {
    onChange(
      multi
        ? !name
          ? []
          : { target: name, value: [] }
        : !name
        ? ''
        : { target: name, value: '' }
    );
    if (setTrigger) {
      setTrigger(!trigger);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  const onInputChange = (value, param) => {
    if (param.action !== 'set-value' && param.action !== 'menu-close') {
      setSearchText(value);
    }
  };
  const filterOptionFunc = (option, inputValue) => {
    let searchTriger = false;
    searchKeys.forEach(element => {
      if (option.data[element]) {
        if (
          option.data[element].toLowerCase().includes(inputValue.toLowerCase())
        )
          searchTriger = true;
      }
    });
    return inputValue ? searchTriger : true;
  };
  return (
    <div
      className={cn(
        className ? className : classes.wrapSelect,
        isDisabled && classes.disabled
      )}
    >
      {label && (
        <Heading className={cn(classes.title, classTitle)}>
          {label}{' '}
          {tooltip && (
            <Hint text={tooltip()} position="top" className={classes.tooltip} />
          )}
        </Heading>
      )}
      <div className={classes.selectWrap} ref={searchRef}>
        {searchable && (
          <HeaderSelect
            value={
              multi
                ? value
                  ? createOptions(value)
                  : null
                : value
                ? { value: value, label: value }
                : null
            }
            handleOpen={handleOpen}
            placeholder={
              !placeholder
                ? `${t(t('activity:filters.SELECT'))} ${label}`
                : placeholder
            }
            clearable={clearable}
            clearValue={clearValue}
            open={open}
            renderKey={renderKey}
            options={
              list && list.length === 0
                ? undefined
                : list && !list[0].value
                ? createOptions(list)
                : list
            }
          />
        )}
        {((searchable && open) || !searchable) && (
          <div className={searchable && classes.select} ref={node}>
            <Select
              uppercase={uppercase}
              onMenuClose={() => setTrigger && setTrigger(!trigger)}
              selectLoader={selectLoader}
              setTrigger={setTrigger}
              trigger={trigger}
              isSearchable={searchable ? true : false}
              renderKey={renderKey}
              checkRenderKey={checkRenderKey}
              isMulti={multi}
              isDisabled={isDisabled}
              autoFocus={
                searchable
                  ? autoFocus
                    ? autoFocus
                    : true
                  : autoFocus
                  ? autoFocus
                  : false
              }
              value={
                multi
                  ? value
                    ? createOptions(value)
                    : null
                  : value
                  ? { value: value, label: value }
                  : null
              }
              inputValue={searchText}
              onInputChange={onInputChange}
              filterOption={filterOptionFunc}
              menuIsOpen={!searchable ? undefined : open}
              menuPlacement={'bottom'}
              placeholder={
                !searchable
                  ? !placeholder
                    ? `${t(t('activity:filters.SELECT'))} ${label}`
                    : placeholder
                  : typeof searchable === 'boolean'
                  ? `${t('activity:filters.SEARCH')} ${label}`
                  : searchable
              }
              closeMenuOnSelect={multi ? false : true}
              isClearable={clearable}
              components={
                !searchable
                  ? {
                      IndicatorSeparator: null,
                      DropdownIndicator: DropdownIndicatorPart,
                      ClearIndicator: ClearIndicatorPart,
                      Option: OptionPart,
                      Placeholder: PlaceholderPart,
                      Menu: MenuPart
                    }
                  : {
                      IndicatorSeparator: null,
                      DropdownIndicator: DropdownIndicatorSearch,
                      ClearIndicator: null,
                      Option: OptionPart,
                      Menu: MenuPart
                    }
              }
              controlShouldRenderValue={false}
              hideSelectedOptions={false}
              onChange={onSelectChange}
              options={
                list && list.length === 0
                  ? undefined
                  : list && !list[0].value
                  ? createOptions(list)
                  : list
              }
              styles={!searchable ? selectStyles : selectStylesSearch}
              tabSelectsValue={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

SelectDropDown.propTypes = {
  uppercase: PropTypes.bool,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  multi: PropTypes.bool,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(string),
    PropTypes.arrayOf(object)
  ]),
  label: PropTypes.string,
  clearable: PropTypes.bool,
  searchable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  searchKeys: PropTypes.arrayOf(string),
  input: PropTypes.object.isRequired,
  renderKey: PropTypes.string,
  checkRenderKey: PropTypes.string,
  className: PropTypes.string,
  tooltip: PropTypes.func,
  reload: PropTypes.bool,
  closeTrigger: PropTypes.shape({
    trigger: PropTypes.bool.isRequired,
    setTrigger: PropTypes.func.isRequired
  }),
  selectLoader: PropTypes.bool,
  name: PropTypes.string,
  isDisabled: PropTypes.bool,
  classTitle: PropTypes.string
};

export default SelectDropDown;
