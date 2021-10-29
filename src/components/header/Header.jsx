import React, { PureComponent } from "react";
import {
  HeaderContainer,
  HeaderTitle,
} from "../../styledComponents/header/headerStyle";

class Header extends PureComponent {
  render() {
    console.log("I'm Header.jsx!");
    return (
      <HeaderContainer>
        <HeaderTitle>Video Call</HeaderTitle>
      </HeaderContainer>
    );
  }
}

export default Header;
