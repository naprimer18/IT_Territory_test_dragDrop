import { gql } from 'apollo-boost';

export const NoteTitleQuery = gql`
  query NoteTitleQuery($serchName: String) {
    Notes(name: $serchName) {
      name,
      id,
      isDone
    }
  }
`;
