import React from 'react';
import DataLoader from './DataLoader';
import { useKeycloak } from './KeycloakContext';

export function FruitLoader(props: any) {
  return ListLoader({ ...props, url: '/api/fruits/' })
}

export function LegumeLoader(props: any) {
  return ListLoader({ ...props, url: '/api/legumes/' })
}

function ListLoader(props: any) {
  const token = useKeycloak().token;
  const loader = async () => {
    return await fetch(props.url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then(res => res.json());
  };
  return (
    <DataLoader loader={loader}>
      {props.children}
    </DataLoader>
  );
}