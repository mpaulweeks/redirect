import React, { Component } from 'react';
import styled from 'styled-components';

class API {
  constructor(password) {
    this.password = password;
    const isDev = window.location.href.includes('localhost');
    this.baseUrl = (
      isDev ?
      'http://localhost:3001/' :
      ''
    ) + 'api';
  }
  fetchLinks() {
    return fetch(this.baseUrl)
      .then(resp => resp.json())
  }
  addLink(payload) {
    return fetch(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify({
        ...payload,
        password: this.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(resp => {
      if (!resp.ok) {
        throw Error(resp.statusText);
      }
      return resp.json();
    });
  }
}

const Container = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 10px auto;

  & > * {
    margin: 10px auto;
  }
`;

const ErrorText = styled.div`
  color: red;
`;

class EditorApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: {},
      error: null,
    };
  }
  componentDidMount() {
    this.api = new API(this.props.password);
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
      this.refs.key.value = '';
      this.refs.value.value = '';
      this.setState({
        links: links,
        error: null,
      });
    }).catch(err => {
      this.setState({
        error: err.toString(),
      });
    });
  }
  render() {
    const { links, error } = this.state;
    const sortedKeys = Object.keys(links);
    sortedKeys.sort();
    return (
      <Container>
        <h1>admin</h1>
        <form onSubmit={e => this.onSubmit(e)}>
          <div>
            <input type="text" ref="key" placeholder="short" />
          </div>
          <div>
            <input type="text" ref="value" placeholder="full url" />
          </div>
          <div>
            <input type="submit" value="save" />
          </div>
        </form>
        <table>
          <thead>
            <tr>
              <th>short</th>
              <th>full url</th>
            </tr>
          </thead>
          <tbody>
            {sortedKeys.map(key => (
              <tr key={'link-'+key}>
                <td>{key}</td>
                <td><a href={links[key]}>{links[key]}</a></td>
              </tr>
            ))}
          </tbody>
        </table>
        {error && (
          <ErrorText>
            {error}
          </ErrorText>
        )}
      </Container>
    );
  }
}

export default EditorApp;
