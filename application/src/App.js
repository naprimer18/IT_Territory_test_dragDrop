import React, { Component } from 'react';
import TodoList from './components/todoList';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:3005/graphql',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
          <TodoList />
      </ApolloProvider>
    );
  }
}

export default App;
