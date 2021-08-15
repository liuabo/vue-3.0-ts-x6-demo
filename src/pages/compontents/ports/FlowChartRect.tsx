import { useState ,useEffect } from 'react'
import './index.less'

const FlowChartRect = (props: any) => {
    let [name, setName] = useState(null)
    useEffect(() => {
        console.log('props', props);
        setName(props.text);
    }, [])
    return (
        <div className='flow-chart-node'>
            {name}
        </div>
    )
}

export default FlowChartRect