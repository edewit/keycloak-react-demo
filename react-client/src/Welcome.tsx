import React, { FunctionComponent, Fragment } from "react";
import { TextContent, Text } from "@patternfly/react-core";

const Welcome: FunctionComponent = () => {
  return (
    <Fragment>
      <TextContent>
        <Text component="h1">Welcome</Text>
        <Text component="p">
          Only if you are logged in as admin can you add new fruit to the fruit list. If you are use test you'll get a "Forbidden" error.
          In a real application we wouldn't even show the Administrator options in the menu, but here we want to see that keycloak works.
        </Text>
      </TextContent>
    </Fragment>
  );
};

export default Welcome;