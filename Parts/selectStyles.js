export const selectStyles = {
  valueContainer: styles => ({
    ...styles,
    display: 'flex'
  }),
  control: (styles, { menuIsOpen }) => ({
    ...styles,
    paddingLeft: '8px',
    height: '40px',
    borderRadius: '3px',
    border: !menuIsOpen ? 'solid 1px #dde6f2' : 'solid 1px #3e88ff',
    backgroundColor: 'white',
    boxShadow: menuIsOpen && '0 4px 8px 0 rgba(59, 116, 168, 0.2)',
    ':hover': {
      borderRadius: '3px',
      borderColor: !menuIsOpen ? '#dde6f2' : '#3e88ff',
      cursor: 'pointer'
    },
    ':focus-within': {
      borderColor: '#3e88ff',
      boxShadow: '0 4px 8px 0 rgba(59, 116, 168, 0.2)'
    }
  }),
  menu: styles => ({
    ...styles,
    marginTop: '5px',
    borderRadius: '3px',
    boxShadow: '0 4px 8px 0 rgba(59, 116, 168, 0.2)',
    backgroundColor: 'white'
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      padding: '0',
      margin: '0',
      backgroundColor: isFocused ? '#f6faff' : null,
      color: '#536283',
      fontFamily: 'Inter',
      fontSize: '14px',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? '' : '#f6faff')
      }
    };
  }
};

export const selectStylesSearch = {
  valueContainer: styles => ({
    ...styles,
    display: 'flex'
  }),
  control: styles => ({
    marginTop: '5px',
    paddingLeft: '8px',
    ...styles,
    height: '40px',
    border: 'none',
    borderBottom: 'solid 1px #dde6f2',
    borderRadius: '3px 3px 0 0',
    backgroundColor: 'white',
    zIndex: 1,
    outline: 'none',
    boxShadow: '0 4px 8px 0 rgba(59, 116, 168, 0.2)',
    ':hover': {
      borderColor: '#dde6f2',
      cursor: 'pointer'
    }
  }),
  menu: styles => ({
    ...styles,
    margin: '0px',
    borderRadius: '0 0 3px 3px',
    boxShadow: '0 4px 8px 0 rgba(59, 116, 168, 0.2)',
    backgroundColor: 'white'
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      padding: '0',
      margin: '0',
      backgroundColor: isFocused ? '#f6faff' : null,
      color: '#536283',
      fontFamily: 'Inter',
      fontSize: '14px',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? '' : '#f6faff')
      }
    };
  },
  placeholder: styles => ({
    ...styles,
    fontFamily: 'Inter',
    fontSize: '14px',
    color: 'rgba(83, 98, 131, 0.5)'
  }),
  input: styles => ({
    ...styles,
    fontFamily: 'Inter',
    fontSize: '14px',
    color: 'rgb(83, 98, 131)',
    backgroundColor: 'white'
  })
};
