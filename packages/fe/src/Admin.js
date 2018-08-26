import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 10px auto;

  & > * {
    margin: 10px auto;
  }
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
  addLink(payload) {
    return fetch(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(resp => resp.json());
  }
}

class AdminApp extends Component {
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
  onSubmit(e) {
    e.preventDefault();
    const payload = {
      key: this.refs.key.value,
      value: this.refs.value.value,
    };
    this.api.addLink(payload).then(links => {
      window.location.reload();
    })
  }
  render() {
    const { links } = this.state;
    return (
      <Container>
        <h1>admin</h1>
        <form onSubmit={e => this.onSubmit(e)}>
          <input type="text" ref="key" placeholder="short" />
          <input type="text" ref="value" placeholder="full url" />
          <input type="submit" value="save" />
        </form>
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

export default AdminApp;
