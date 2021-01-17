import React, { useState } from 'react';

function ResponseProperty({ className, name, description, type, items }) {
  let sub = "";
  let subType = "";
  let subSub = "";

  if (type === 'array' && typeof items !== 'undefined' && items.type == 'object') {
    subType = ' [' + items.type + ']';
    sub = Object.keys(items.properties).map(key => {
      if (items.properties[key].type === 'object'  && typeof items.properties[key].properties !== 'undefined') {
        subSub = Object.keys(items.properties[key].properties).map(subKey => {
          return (
            <div key={subKey} className="subprop">
              <span className="code">{subKey}</span>
              <span className="code type">{items.properties[key].properties[subKey].type}</span>
              - {items.properties[key].properties[subKey].description}
            </div>
          );
        })
      }
      return (
        <li key={key}>
          <span className="code">{key}</span>
          <span className="code type">{items.properties[key].type}</span>
          {subSub}
        </li>
      );
    });
  } else if (type === 'object') {
    subType = " propertieeeeees";
  }

  return (
    <li className={className}>
      <span className="code">{name}</span>
      <span className="code type">{type} {subType}</span>
      - {description}
      <ul className="sub-props">
        {sub}
      </ul>
    </li>
  )
}

export default function Response({ schema, uri }) {
  const [expand, setExpand] = useState({})

  function toggleExpander(uri, ev) {
    console.debug(ev, uri);
    console.log('toggleExpander newval:', !(!!expand[uri]))
    setExpand({
      ...expand,
      [uri]: !(!!expand[uri])
    })
  }

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
        <div id={'response-schema-' + uri} className={"codeblock schema" + (!!expand[uri] ? "" : " collapsed")}>
          <pre>
            {JSON.stringify(schema, null, 4)}
          </pre>
          <div className="expand has-text-centered" onClick={(ev) => toggleExpander(uri, ev)}>
            <button className="button is-info is-outlined">
              {!!expand[uri]  ? "Collapse" : "Expand"}
            </button>
          </div>
        </div>    
    </div>
  )
}
