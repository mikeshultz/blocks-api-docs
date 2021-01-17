import { useState, useEffect } from 'react'
import api from '../lib/api'
import { CACHE_DURATION } from '../config'

export default function useDocs(friendID) {
  const [fetched, setFetched] = useState(null)
  const [docs, setDocs] = useState(null)

  useEffect(() => {
    const now = +new Date()

    if (!fetched || fetched < now - CACHE_DURATION) {
      api.docs().then(resp => {
        console.log('api docs:', resp)
        setFetched(now)
        setDocs(resp)
      })
    }
  })

  return docs
}
