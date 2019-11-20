import React, { useRef, useEffect, useState } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

export default function ReactSelect({
  name,
  async,
  options,
  loadOptions,
  setValue,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [select, setSelect] = useState(null);
  const [asyncOptions, setAsyncOptions] = useState(null);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;

    return selectValue ? selectValue.id : null;
  }

  useEffect(() => {
    async function loadOption() {
      if (!defaultValue) return;

      if (loadOptions) {
        const data = await loadOptions();
        setAsyncOptions(data);
      }
    }

    loadOption();
  }, [defaultValue, loadOptions]);

  useEffect(() => {
    if (asyncOptions) {
      setSelect(asyncOptions.find(op => op.id === defaultValue));
    } else if (options) {
      setSelect(options.find(op => op.id === defaultValue));
    }
  }, [asyncOptions, defaultValue, options]);

  useEffect(() => {
    if (ref.current) {
      ref.current.state.value = select;
    }
    if (setValue) {
      setValue(select);
    }
  }, [select, setValue]);

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

  if (async) {
    return (
      <>
        <AsyncSelect
          name={fieldName}
          loadOptions={loadOptions}
          getOptionValue={option => option.id}
          onChange={setSelect}
          value={select}
          ref={ref}
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
        ref={ref}
        getOptionValue={option => option.id}
        onChange={setSelect}
        value={select}
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
  setValue: PropTypes.func,
};

ReactSelect.defaultProps = {
  async: false,
  options: [],
  loadOptions: null,
  setValue: null,
};
