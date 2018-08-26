import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 10px auto;
`;

class API {
  constructor() {
    const isDev = window.location.href.includes('localhost');
    this.baseUrl = (
      isDev ?
      'http://localhost:3001' :
      'https://yi9bbl5wp1.execute-api.us-east-1.amazonaws.com/latest'
    ) + '/api';
  }
  fetchLinks() {
    return fetch(this.baseUrl)
      .then(resp => resp.json())
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: {},
    };
  }
  componentDidMount() {
    this.api = new API();
    this.api.fetchLinks().then(links => {
      this.setState({
        links: links,
      });
    })
  }
  render() {
    const { links } = this.state;
    return (
      <Container>
        admin view. hello world!
        <table>
          <thead>
            <tr>
              <th>shortened link</th>
              <th>full url</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(links).map(key => (
              <tr key={'link-'+key}>
                <td>{key}</td>
                <td>{links[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    );
  }
}

export default App;
