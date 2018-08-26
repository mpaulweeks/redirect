import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 10px auto;
`;


class App extends Component {
  render() {
    return (
      <Container>
        admin view. hello world!
      </Container>
    );
  }
}

export default App;
