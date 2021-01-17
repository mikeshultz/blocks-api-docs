import React from 'react';
import { API_ROOT } from '../config';
import Request from './request';
import Response from './response';

import useDocs from '../hooks/useDocs'

const NUMBER_STAND_IN = 123;
const STRING_STAND_IN = "0xdeadbeef...";
const EXAMPLE_REQUESTS = {
  "/": `curl ${API_ROOT}/`,
  "/health": `curl ${API_ROOT}/block`,
  "/block": `curl -X POST --data '{"block_number": 5689239}' ${API_ROOT}/block`,
  "/transaction": `curl -X POST --data '{"hash": "0x1d72c87e69d88b85cf0679b5f438c7fc8490919bf59976291f8fdc09d9b41b9f"}' ${API_ROOT}/transaction`,
  "/gas-price": `curl -X POST --data '{"type": "average", "block_length": 100}' ${API_ROOT}/gas-price`,
}


function getExampleRequest(endpoint) {
  return EXAMPLE_REQUESTS[endpoint];
}


export default function Docs() {
  const endpoints = useDocs()

  if (!endpoints || endpoints.length < 1) {
    return (
      <section className="section loading">Loading...</section>
    );
  }

  const tocItems = endpoints.map(endpoint => {
    return (
      <li key={'contents-' + endpoint.uri}><a href={'#' + endpoint.uri}>{endpoint.uri}</a></li>
    );
  });

  const endpoinSections = endpoints.map(endpoint => {
    return (
      <div className="endpoint content" key={'endpoint-' + endpoint.uri}>
        <a name={endpoint.uri}></a>
        <h2 className="heading is-2"><a href={API_ROOT + endpoint.uri}>{endpoint.method} {endpoint.uri}</a></h2>

        <h3 className="heading is-3">Description</h3>
        <p>{endpoint.description}</p>

        <h3 className="heading is-3">Example Request</h3>
        <div className="code codeblock">{getExampleRequest(endpoint.uri)}</div>

        <div className={endpoint.request ? '' : 'hide'}>
          <h3 className="heading is-3">Request</h3>
          <Request schema={endpoint.request} uri={endpoint.uri} />
        </div>
        <div className={endpoint.response ? '' : 'hide'}>
          <h3 className="heading is-3">Response</h3>
          <Response schema={endpoint.response} />
        </div>
      </div>
    );
  });

  return (
    <section className="section">
      <div className="columns">
        <div className="column is-three-quarters">
          <div className="endpoint content" key="general">
            <a name="#general"></a>
            <h2 className="heading is-2">Overview</h2>

            <h3 className="heading is-3">Introduction</h3>
            <p><em className="bold">This API is BETA level software</em>. Expect API changes, load issues, and bugs!</p> 
            <p>All endpoints can use the root URL of <a href={API_ROOT}>{API_ROOT}</a>.</p>

            <h3 className="heading is-3">Restrictions</h3>
            <p>There's a rate limiter based on IP address.  No single IP address can make more than 1 request per second, calculated in 5 minute blocks.  Rate limits subject to change without notice.  If you need to make more requests or have a more flexible solution, please E-mail <a href="mailto:contact@gointo.software">contact@gointo.software</a>.</p>
          </div>
          {endpoinSections}
        </div>
        <div className="column is-one-quarter">
          <nav className="side-nav">
            <ul>
              <li key={'contents-general'}><a href="#general">Overview</a></li>
              {tocItems}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
