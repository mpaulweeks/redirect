import React, { Component } from 'react';
import styled from 'styled-components';

const baseAssets = 'http://s3.amazonaws.com/mpaulweeks-redirect/fe/';
const logoUrl = baseAssets + 'favicon.png';

class API {
  constructor() {
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
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(resp => resp.json());
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

class Editor extends Component {
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
      </Container>
    );
  }
}

const Welcome = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #888;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

class AdminApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unlocked: false,
    };
  }
  hashInput(str) {
    // https://stackoverflow.com/a/8831937/6461842
    var hash = 0;
    if (str.length === 0) {
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
      <Editor />
    ) : (
      <Welcome>
        <div>
          <img src={logoUrl} alt="redirect logo" />
        </div>
        <div>
          <input type="password" onChange={e => this.onChange(e)} />
        </div>
      </Welcome>
    );
  }
}

export default AdminApp;
