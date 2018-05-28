import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1 className="heading is-1 brand">blocks.lol</h1>
        <p className="is-5">An API-first Ethereum block explorer.</p>
      </header>
    );
  }
}

export default connect()(Header);
