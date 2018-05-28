import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as docsActions from '../actions/docs';

class Request extends Component {
  componentDidMount() {
    this.toggleExpander = this.toggleExpander.bind(this);
  }

  toggleExpander(uri, ev) {
    console.debug(ev, uri);
    this.props.actions.expandSchema(uri);
  }

  render() {
    const { schema, uri, expand } = this.props;
    if (schema) {
      const requestProperties = Object.keys(schema.properties).map(key => {
        return (
          <li key={key} className="property">
            <span className="code">{key}</span>
            <span className="code type">{schema.properties[key].type}</span>
            - {schema.properties[key].description}
          </li>
        );
      });
      return (
        <div className="request">
          <h4 className="heading is-4">{schema.title} {schema.type}</h4>
          <p>{schema.description}</p>
          
          <h5 className="heading is-5">Properties</h5>
          <ul>
            {requestProperties}
          </ul>

          <h4 className="heading is-4">JSON Schema</h4>
          <div id={'request-schema-' + uri} className={"codeblock schema" + (expand === true ? "" : " collapsed")}>
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
    } else {
      return (
        <div className="request">
          <pre className="codeblock">null</pre>
        </div>
      );
    }
  }
}

Request.propTypes = {
  actions: PropTypes.object.isRequired,
  schema: PropTypes.object,
  uri: PropTypes.string
};

function mapStateToProps(state, props) {
  return {
    expand: state.docs.expand['request-schema-' + props.uri],
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
)(Request);