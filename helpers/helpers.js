export const createOptions = options =>
  options
    .map(item => ({ value: item, label: item }))
    .filter(el => el.value !== '');

export const findOptionByKey = (value, options, key) => {
  if (
    options &&
    options.length > 0 &&
    options.find(option => option.value === value)
  ) {
    return options.find(option => option.value === value)[key];
  }
};
