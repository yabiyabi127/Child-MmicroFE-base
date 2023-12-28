import React, { useEffect } from 'react'
import usePromiseAll from 'utils/api/usePromiseAll'
function AppRender() {
    const [ res, fetch ] = usePromiseAll()
    fetch(null)
    useEffect(() => {
      console.log(res);
    }, [res])
    return (
        <div>
            
        </div>
    )
}

export default AppRender
