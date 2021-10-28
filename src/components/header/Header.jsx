import React, { Component } from "react";
import {
  HeaderContainer,
  HeaderTitle,
} from "../../styledComponents/header/headerStyle";

class Header extends Component {
  render() {
    return (
      <HeaderContainer>
        <HeaderTitle>Video Call</HeaderTitle>
      </HeaderContainer>
    );
  }
}

export default Header;
