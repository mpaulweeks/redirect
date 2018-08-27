import React, { Component } from 'react';
import styled from 'styled-components';

import { FixedContainer, Logo, Title } from './Common';
import EditorApp from './EditorApp';


class WelcomeApp extends Component {
  render() {
    return (
      <FixedContainer>
        <Logo />
        <Title> welcome to <strong>redirect</strong> </Title>
        <div>
          you weren't meant to find this page. nothing to see here!
        </div>
      </FixedContainer>
    );
  }
}

export default WelcomeApp;
