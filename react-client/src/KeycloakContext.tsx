import { createContext, useContext } from 'react';
import Keycloak from 'keycloak-js';

export const KeycloakContext = createContext<Keycloak.KeycloakInstance<'native'> | undefined>(undefined);

export function useKeycloak(): Keycloak.KeycloakInstance<'native'> {
  const context = useContext(KeycloakContext);
  if (!context) {
    throw new Error('keycloak must be initialised');
  }
  return context;
}