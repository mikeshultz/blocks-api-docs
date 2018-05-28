import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as apiActions from '../actions/api';
import * as infuraActions from '../actions/infura';

class SyncStatus extends Component {
  render() {
    const { diff } = this.props;
    if (diff === -1) return (<span></span>);
    if (diff < 5) {
      return (
        <span className="success">ok</span>
      );
    } else if (50 > diff >= 5) {
      return (
        <span className="warning">lag</span>
      );
    } else {
      return (
        <span className="danger">syncing</span>
      );
    }
  }
}

class Status extends Component {
  componentDidMount() {
    this.props.actions.getHealth();
    console.log(this.props);
    this.props.infuraActions.getBlockNo();
  }
  render() {
    const { health, blockNumber, mainnetBlockNumber } = this.props;
    let healthClass = "";
    if (health === "ok") {
      healthClass = "success";
    } else if (health === "bad") {
      healthClass = "danger";
    }
    let diff = -1;
    if (mainnetBlockNumber > 0 && blockNumber) {
      diff = mainnetBlockNumber - blockNumber;
    }
    return (
      <section className="section">
        <div className="columns">
          <div className="column is-three-quarters">
            <div className="level">
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">API Health</p>
                  <p className={'title ' + healthClass}>{health}</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Sync</p>
                  <p className="title"><SyncStatus diff={diff} /></p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">LOL Block Number</p>
                  <p className="title">{blockNumber.toLocaleString()}</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Mainnet Block Number</p>
                  <p className="title">{this.props.mainnetBlockNumber.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Status.propTypes = {
  actions: PropTypes.object.isRequired,
  health: PropTypes.string.isRequired,
  blockNumber: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  return {
    health: state.api.health,
    blockNumber: state.api.blockNumber,
    mainnetBlockNumber: state.infura.blockNumber,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(apiActions, dispatch),
    infuraActions: bindActionCreators(infuraActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Status);