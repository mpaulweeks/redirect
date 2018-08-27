import React, { Component } from 'react';

import { FixedContainer, Logo, Title } from './Common';

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
