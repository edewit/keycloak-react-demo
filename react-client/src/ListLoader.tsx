import React, { Fragment, useState } from 'react';
import DataLoader from './DataLoader';
import { useKeycloak } from './KeycloakContext';
import { Alert } from '@patternfly/react-core';

export function FruitLoader(props: any) {
  return ListLoader({ ...props, url: '/api/fruits/' })
}

export function LegumeLoader(props: any) {
  return ListLoader({ ...props, url: '/api/legumes/' })
}

function ListLoader(props: any) {
  const [error, setError] = useState('');

  const token = useKeycloak().token;
  const loader = async () => {
    return await fetch(props.url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then(resp => {
        if (!resp.ok) {
          setError('User not in role? ' + resp.statusText);
        } else {
          return resp.json();
        }
      })
  };
  return (
    <Fragment>
      {error !== '' && (
        <Alert
          variant="danger"
          title={error}
        />
      )}
      {error === '' && (
        <DataLoader loader={loader}>
          {props.children}
        </DataLoader>)}
    </Fragment>
  );
}