import React, { useRef, useEffect } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

export default function ReactSelect({
  name,
  async,
  options,
  loadOptions,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;

    return selectValue ? selectValue.id : null;
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function getDefaultValue() {
    if (!defaultValue) return null;

    return options.filter(option => defaultValue.includes(option.id));
  }

  if (async) {
    return (
      <>
        <AsyncSelect
          name={fieldName}
          loadOptions={loadOptions}
          defaultValue={getDefaultValue()}
          ref={ref}
          getOptionValue={option => option.id}
          onChange={value => {
            ref.current.state.value = value;
          }}
          cacheOptions
          defaultOptions
          isClearable
          {...rest}
        />

        {error && <span>{error}</span>}
      </>
    );
  }

  return (
    <>
      <Select
        name={fieldName}
        options={options}
        defaultValue={getDefaultValue()}
        ref={ref}
        getOptionValue={option => option.id}
        isClearable
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}

ReactSelect.propTypes = {
  name: PropTypes.string.isRequired,
  async: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object),
  loadOptions: PropTypes.func,
};

ReactSelect.defaultProps = {
  async: false,
  options: [],
  loadOptions: null,
};
