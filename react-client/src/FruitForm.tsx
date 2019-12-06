import React, { useState, Fragment } from 'react';
import { InputForm } from './InputForm';
import { Alert, AlertActionCloseButton } from '@patternfly/react-core';
import { useKeycloak } from './KeycloakContext';

export default function FruitForm() {
  const [error, setError] = useState('');
  const token = useKeycloak().token;
  return (
    <Fragment>
      {error !== '' && (
        <Alert
          variant="danger"
          title={error}
          action={<AlertActionCloseButton onClose={() => setError('')} />}
        />
      )}
      <h3>Add a fruit</h3>
      <InputForm callback={fruit =>
        fetch('/api/fruits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(fruit),
        })
          .then(resp => {
            if (!resp.ok) {
              setError(resp.statusText);
            } else {
              return resp.json();
            }
          })
      }>
      </InputForm>
    </Fragment>
  );
}