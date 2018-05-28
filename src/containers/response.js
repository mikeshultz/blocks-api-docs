import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as docsActions from '../actions/docs';

class ResponseProperty extends Component {
  render() {
    let that = this;
    let sub = "";
    let subType = "";
    let subSub = "";
    if (this.props.type === 'array' && typeof this.props.items !== 'undefined' && this.props.items.type == 'object') {
      subType = ' [' + this.props.items.type + ']';
      sub = Object.keys(this.props.items.properties).map(key => {
        if (that.props.items.properties[key].type === 'object'  && typeof that.props.items.properties[key].properties !== 'undefined') {
          subSub = Object.keys(that.props.items.properties[key].properties).map(subKey => {
            return (
              <div key={subKey} className="subprop">
                <span className="code">{subKey}</span>
                <span className="code type">{that.props.items.properties[key].properties[subKey].type}</span>
                - {that.props.items.properties[key].properties[subKey].description}
              </div>
            );
          })
        }
        return (
          <li key={key}>
            <span className="code">{key}</span>
            <span className="code type">{this.props.items.properties[key].type}</span>
            {subSub}
          </li>
        );
      });
    } else if (this.props.type === 'object') {
      subType = " propertieeeeees";
    }
    return (
      <li key={this.props.key} className={this.props.className}>
        <span className="code">{this.props.name}</span>
        <span className="code type">{this.props.type} {subType}</span>
        - {this.props.description}
        <ul className="sub-props">
          {sub}
        </ul>
      </li>
    );
  }
}

class Response extends Component {
  componentDidMount() {
    this.toggleExpander = this.toggleExpander.bind(this);
  }

  toggleExpander(uri, ev) {
    console.debug(ev, uri);
    this.props.actions.expandSchema(uri);
  }

  render() {
    const { schema, uri, expand } = this.props;
    const responseProperties = Object.keys(schema.properties).map(key => {
      return (
        <ResponseProperty 
          key={key}
          name={key}
          type={schema.properties[key].type}
          className="property"
          description={schema.properties[key].description}
          items={schema.properties[key].items} />
      );
    });
    return (
      <div className="response">
          <h4 className="heading is-4">{schema.title} Object</h4>
          <p>Type: {schema.type}</p>
          <h5 className="heading is-5">Properties</h5>
          <ul>
            {responseProperties}
          </ul>      

          <h4 className="heading is-4">JSON Schema</h4>
          <div id={'response-schema-' + uri} className={"codeblock schema" + (expand === true ? "" : " collapsed")}>
            <pre>
              {JSON.stringify(schema, null, 4)}
            </pre>
            <div className="expand has-text-centered" onClick={(ev) => this.toggleExpander(uri, ev)}>
              <button className="button is-info is-outlined">
                {expand === true ? "Collapse" : "Expand"}
              </button>
            </div>
          </div>    
      </div>
    );
  }
}

Response.propTypes = {
  actions: PropTypes.object.isRequired,
  schema: PropTypes.object,
  uri: PropTypes.string
};

function mapStateToProps(state, props) {
  return {
    expand: state.docs.expand['response-schema-' + props.uri],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    "actions": bindActionCreators(docsActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Response);