import React, { useState, FormEvent, FunctionComponent } from 'react';
import { Fruit } from './types';
import { Form, FormGroup, TextInput, ActionGroup, Button } from '@patternfly/react-core';

interface FormProps {
  callback: (fruit: Fruit) => void;
};

export const InputForm: FunctionComponent<FormProps> = (props) => {
  const DEFAULT_VALUE = { name: '', description: '' } as Fruit;
  const [inputs, setInputs] = useState(DEFAULT_VALUE);
  const handleSubmit = (event: FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    props.callback(inputs);
    setInputs(DEFAULT_VALUE);
  };
  const handleInputChange = (value: string, event: FormEvent<HTMLInputElement>) => {
    event.persist();
    setInputs({ ...inputs, [event.currentTarget.name]: value });
  };
  return (
    <Form>
      <FormGroup
        label="Name"
        isRequired
        fieldId="name"
        helperText="Please provide the name of the fruit"
      >
        <TextInput isRequired type="text" id="name" name="name" size={60} onChange={handleInputChange} value={inputs.name} />
      </FormGroup>
      <FormGroup
        label="Description"
        fieldId="description"
        helperText="Please provide a description"
      >
        <TextInput type="text" id="description" name="description" size={60} onChange={handleInputChange} value={inputs.description} />
      </FormGroup>
      <ActionGroup>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </ActionGroup>
    </Form>
  );
}