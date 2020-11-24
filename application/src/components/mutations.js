import { gql } from 'apollo-boost';

export const addNoteTitle = gql`
  mutation addNoteTitle($name: String) {
    addNote(name: $name, isDone: false) {
      name
    }
  }
`;

export const deleteNoteTitle = gql`
  mutation deleteNoteTitle($id: String) {
    deleteNote(id: $id) {
      id
    }
  }
`;

export const updateNoteTitle = gql`
  mutation updateNoteTitle($nameId: String, $name: String ,$isDone: Boolean) {
    updateNote(id: $nameId ,name: $name, isDone: $isDone) {
      name
    }
  }
`;
