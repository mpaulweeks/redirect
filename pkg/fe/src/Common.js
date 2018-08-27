import React, { Component } from 'react';
import styled from 'styled-components';

const logoUrl = `${window.ROOT_PATH}/favicon.png`;

const FixedContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #888;
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 2rem;
  margin: 0.5rem;
`;

export {
  FixedContainer,
  Title,
};

export class Logo extends Component {
  render(){
    return (
      <div>
        <img src={logoUrl} alt="redirect logo" />
      </div>
    );
  }
}
