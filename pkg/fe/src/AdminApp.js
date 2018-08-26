import React, { Component } from 'react';
import styled from 'styled-components';

import EditorApp from './EditorApp';

const logoUrl = `${window.ROOT_PATH}/favicon.png`;

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
    if (!str || str.length === 0) {
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
    const password = e.target.value;
    const hash = this.hashInput(password);
    if (hash === 1265856690){
      this.setState({
        unlocked: true,
        password: password,
      });
    }
  }
  render() {
    const { unlocked, password } = this.state;
    return unlocked ? (
      <EditorApp password={password}/>
    ) : (
      <Welcome>
        <div>
          <img src={logoUrl} alt="redirect logo" />
        </div>
        <form>
          <input type="password" onChange={e => this.onChange(e)} />
        </form>
      </Welcome>
    );
  }
}

export default AdminApp;
