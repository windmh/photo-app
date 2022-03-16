import React from "react";
import PropTypes from "prop-types";
import { FormFeedback, FormGroup, Label } from "reactstrap";
import Select from "react-select";
import { ErrorMessage } from "formik";

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
};

SelectField.defaultProps = {
  label: "",
  placeholder: "",
  disabled: false,
  options: [],
};

function SelectField(props) {
  const { field, form, label, placeholder, disabled, options } = props;
  const { name, value } = field; //const { name, value, onChange, onBlur } = field;

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const selectedOption = options.find((option) => option.value === value);

  const handleSelectedOptionChange = (selectOption) => {
    const selectedValue = selectOption ? selectOption.value : selectOption;

    const ChangeEvent = {
      target: {
        name: name,
        value: selectedValue,
      },
    };

    field.onChange(ChangeEvent);
  };

  return (
    <div>
      <FormGroup>
        {label && <Label for={name}>{label}</Label>}
        <Select
          id={name}
          {...field} /* name={name} value={value} onChange={onChange} onBlur={onBlur}*/
          onChange={handleSelectedOptionChange}
          value={selectedOption}
          disabled={disabled}
          placeholder={placeholder}
          options={options}
          className={showError ? "is-invalid" : ""}
        />

        <ErrorMessage name={name} component={FormFeedback} />
      </FormGroup>
    </div>
  );
}

export default SelectField;
