import {
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from "relay-runtime";

/*function fetchQuery(operation: RequestParameters, variables: Variables) {
  return fetch("data/movies.json", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(function (response) {
    console.log(response);
    return response.json();
  }).then(function(myJson) {
    console.log(myJson);
    return myJson;
  });
}*/
const url = 'http://localhost:5000/graphql'

function fetchQuery(
  operation: RequestParameters,
  variables: Variables,
) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource())
});

export default environment;
