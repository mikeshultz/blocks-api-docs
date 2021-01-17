import React, { useState } from 'react';

export default function Request({ schema, uri }) {
  const [expand, setExpand] = useState({})

  function toggleExpander(uri, ev) {
    ev.preventDefault()
    setExpand({
      ...expand,
      [uri]: !(!!expand[uri])
    }) 
  }

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
        <div id={'request-schema-' + uri} className={"codeblock schema" + (!!expand[uri] ? "" : " collapsed")}>
          <pre>
            {JSON.stringify(schema, null, 4)}
          </pre>
          <div className="expand has-text-centered" onClick={(ev) => toggleExpander(uri, ev)}>
            <button className="button is-info is-outlined">
              {!!expand[uri] ? "Collapse" : "Expand"}
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
