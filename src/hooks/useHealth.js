import { useState, useEffect } from 'react'
import api from '../lib/api'
import jsonrpc from '../lib/jsonrpc'
import { CACHE_DURATION } from '../config'

export default function useHealth() {
  const [fetched, setFetched] = useState(null)
  const [health, setHealth] = useState({})

  useEffect(() => {
    const now = +new Date()

    if (!fetched || fetched < now - CACHE_DURATION) {
      api.getHealth().then(resp => {
        jsonrpc.getBlockNo().then(mainnetBlockNumber => {
          setFetched(now)
          setHealth({
            health: resp.message,
            blockNumber: resp.blockNumber,
            mainnetBlockNumber
          })
        })
      })
    }
  });

  return health;
}
