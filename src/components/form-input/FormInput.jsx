import React from 'react';
import { FormInputLabel, Group, Input } from './FormInput.styles';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label &&
        <FormInputLabel shink={otherProps.value.length} >
          {label}
        </FormInputLabel>
      }
    </Group>
  );
};

export default FormInput;