import React, { Component } from 'react';
import styled from 'styled-components';

import { FixedContainer, Logo, Title } from './Common';
import EditorApp from './EditorApp';


class NotFoundApp extends Component {
  render() {
    return (
      <FixedContainer>
        <Logo />
        <Title> this link doesn't seem to go anywhere </Title>
      </FixedContainer>
    );
  }
}

export default NotFoundApp;
