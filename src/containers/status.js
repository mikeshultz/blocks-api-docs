import React from 'react';

function SyncStatus({ diff }) {
  if (diff === -1) return (<span></span>);
  if (diff < 5) {
    return (
      <span className="success">ok</span>
    )
  } else if (50 > diff && diff >= 5) {
    return (
      <span className="warning">lag</span>
    )
  } else {
    return (
      <span className="danger">syncing</span>
    )
  }
}

export default function Status({ health, blockNumber, mainnetBlockNumber }) {
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
                <p className="title">
                  {blockNumber ?
                    blockNumber.toLocaleString() :
                    -1
                  }
                </p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Mainnet Block Number</p>
                <p className="title">
                  {mainnetBlockNumber ?
                    mainnetBlockNumber.toLocaleString() :
                    -1
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
