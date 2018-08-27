import React, { Component } from 'react';

import { FixedContainer, Logo, Title } from './Common';

class AboutApp extends Component {
  render() {
    return (
      <FixedContainer>
        <Logo />
        <Title> <u>redirect</u> </Title>
        <div>
          you weren't meant to find this page. nothing to see here!
        </div>
      </FixedContainer>
    );
  }
}

export default AboutApp;
