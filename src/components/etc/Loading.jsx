import React, { Component } from "react";

class Loading extends Component {
  /* ----------------- Methods  ----------------- */

  /* ----------------- LifeCycle  ----------------- */
  componentDidMount() {
    const { hasNickName, hasRoom } = this.props;
    if (!hasRoom || !hasNickName) {
      this.props.history.push("/");
    }
  }

  /* ----------------- Redner  ----------------- */
  render() {
    return <div>loading</div>;
  }
}

export default Loading;
