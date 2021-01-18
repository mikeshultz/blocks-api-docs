import { useState, useEffect } from 'react'
import api from '../lib/api'
import jsonrpc from '../lib/jsonrpc'
import { CACHE_DURATION, HEALTH_UPDATE } from '../config'

export default function useHealth() {
  const [fetched, setFetched] = useState(null)
  const [health, setHealth] = useState({})
  let ival

  function updateHealth(now = +new Date()) {
    api.getHealth().then(resp => {
      if (!resp) {
        console.warning('No response from /health')
        return
      }

      jsonrpc.getBlockNo().then(mainnetBlockNumber => {
        setFetched(now)
        setHealth({
          health: resp.message,
          blockNumber: resp.blockNumber,
          mainnetBlockNumber
        })
      })
    }).catch(err => {
      console.error('Error performing API health fetch:', err)
      if (ival) {
        clearInterval(ival)
      }
    })
  }

  useEffect(() => {
    const now = +new Date()

    if (!fetched || fetched < now - CACHE_DURATION) {
      updateHealth(now)
      ival = setInterval(updateHealth, HEALTH_UPDATE)
    }

    return () => {
      if (ival) {
        clearInterval(ival)
      }
    }
  }, []);

  return health;
}
