import { GraphQLClient } from "graphql-request";
export const client = new GraphQLClient(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
  //   headers: {
  //     "X-Auth-Token": "OTNmMDI2NDY0YWU0OWRkOGEyM2U5OWEzZTVmOTAyMzA=",
  //   },
});
