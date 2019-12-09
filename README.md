## React quarkus keycloak demo

### Running

Download and install keycloak start on port 8180 with:

    ./bin/standalone.sh -Djboss.socket.binding.port-offset=100

Import the realm `Add realm` -> `Select file` (realm-export.json in this folder) -> `Create`

```
$> mvn install
$> java -jar rest-json/target/rest-json-1.0-SNAPSHOT-runner.jar
```

For the fruit resource the user must have the role 'user' and for adding fruit the user must have role 'admin'
There are 2 user test and admin both have role 'user' and only admin has role 'admin'.

### Dev mode

For development you can start the frontend sperarly from the backend and have hot replace working for both backend and frontend.
Start the frontend with:
```
$> cd react-client
$> yarn
$> yarn start
```
and the backend with:
```
$> cd rest-json
$> mvn compile quarkus:dev:
```
There is a proxy on the frontend dev server for the backend requests, so it works the same as the production version of the site that is packed in the backend.