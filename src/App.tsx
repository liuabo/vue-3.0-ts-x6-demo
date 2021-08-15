import React, { useEffect } from 'react'
import FlowGraph from "./pages/Graph";
import './App.less';
import './reset.less'

const App = () => {
    const getContainerSize = () => {
        return {
            width: document.body.offsetWidth - 214,
            height: document.body.offsetHeight - 105,
        }
    }

    useEffect(() => {
        const graph = FlowGraph.init()

        const resizeFn = () => {
            const { width, height } = getContainerSize()
            // graph.resize(width)
        }
        resizeFn()

        window.addEventListener('resize', resizeFn)
        return () => {
            window.removeEventListener('resize', resizeFn)
        }
    }, [])
  return (
    <div className="flowchart">
      <div className='flowchart-toolbar'></div>
      <div className='content'>
          <div id="stencil" className='stencil'></div>
          <div id="container" className="container" />
          <div id="minimap" className='minimap'></div>
      </div>
    </div>
  );
}

export default App;
