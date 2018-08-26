import React, { Component } from 'react';
import styled from 'styled-components';

const AdminContainer = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 10px auto;

  & > * {
    margin: 10px auto;
  }
`;

const WelcomeContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #888;

  display: flex;
  justify-content: center;
  align-items: center;
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
      this.refs.key.value = '';
      this.refs.value.value = '';
      this.setState({
        links: links,
      });
    })
  }
  render() {
    const { links } = this.state;
    return (
      <AdminContainer>
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
      </AdminContainer>
    );
  }
}

class WelcomeApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unlocked: false,
    };
  }
  hashInput(str) {
    var hash = 0;
    if (str.length == 0) {
      return hash;
    }
    for (var i = 0; i < str.length; i++) {
      var char = str.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
  onChange(e) {
    const hash = this.hashInput(e.target.value);
    if (hash === -392011043){
      this.setState({
        unlocked: true,
      });
    }
  }
  render() {
    const { unlocked } = this.state;
    return unlocked ? (
      <AdminApp />
    ) : (
      <WelcomeContainer>
        <input type="password" onChange={e => this.onChange(e)} />
      </WelcomeContainer>
    );
  }
}

export default WelcomeApp;
