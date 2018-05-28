import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as apiActions from '../actions/api';
import Header from './header';
import Docs from './docs';
import Status from './status';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Status />
        <Docs />
        <section className="section">
          <footer className="footer">
            &copy; Copyright 2018 <a href="https://mikeshultz.com/">Mike Shultz</a>
          </footer>
        </section>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    endpoints: state.api.endpoints,
    health: state.api.health,
    blockNumber: state.api.blockNumber,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(apiActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);