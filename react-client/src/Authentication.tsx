import React, { useState, useEffect } from "react";
import Keycloak, { KeycloakInstance } from "keycloak-js";
import { KeycloakContext } from "./KeycloakContext";
import { Loader } from "./DataLoader";


export function Authentication(props: { children: React.ReactNode; }) {
  const [keycloak, setKeycloak] = useState<KeycloakInstance<'native'> | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const _keycloak = Keycloak<'native'>();
      const auth = await _keycloak.init({ promiseType: 'native', onLoad: 'check-sso', flow: 'standard', responseMode: 'fragment' });
      if (!auth) {
        _keycloak.login({ redirectUri: window.location.href });
      } else {
        setKeycloak(_keycloak);
      }
    })();
  }, []);

  if (!!keycloak) {
    return (
      <KeycloakContext.Provider value={keycloak}>
        {props.children}
      </KeycloakContext.Provider>
    );
  }
  return (<Loader aria-label="Loading data" />);
}