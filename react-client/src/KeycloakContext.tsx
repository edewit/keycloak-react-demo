import { createContext, useContext } from 'react';
import { KeycloakInstance } from "keycloak-js";

export const KeycloakContext = createContext<KeycloakInstance<'native'> | undefined>(undefined);

export function useKeycloak(): KeycloakInstance<'native'> {
  const context = useContext(KeycloakContext);
  if (!context) {
    throw new Error('keycloak must be initialised');
  }
  return context;
}