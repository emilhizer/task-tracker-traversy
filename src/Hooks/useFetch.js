import { useState, useEffect } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)

  // useEffect() runs every time the screen / DOM is rendered
  // So be careful not to (or if you need to) change state in here
  //  because changing state will cause the screen to re-render...
  //  ...infinite loop!
  // Note: that's why there's the [url] at the end - only rerun this if url changes
  useEffect(() => {
    // Cleanup this async data fetch below in case user
    //  browses away from the page that called this function
    const abortCont = new AbortController()

    // set artificial "internet api delay" of "x"ms
    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          // console.log(res)
          if (!res.ok) {
            throw Error(
              'Could not fetch the data for that resource'
            )
          }
          return res.json()
        })
        .then((data) => {
          setData(data)
          setIsPending(false)
          setError(null)
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            console.log('Data fetch aborted')
          } else {
            setError(err.message)
            setIsPending(false)
          }
        })
    }, 1000)

    // Run to clean things up
    return () => abortCont.abort()
  }, [url])
  // ^^^ this array added at the end of useEffect
  //  is the "dependency" array
  //  only the states identified in this array will cause useEffect to fire again
  // Therefore an empty array means that *nothing* will cause useEffect to fire again

  return { data, isPending, error }
}

export default useFetch
