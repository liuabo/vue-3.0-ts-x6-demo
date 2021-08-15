import { useState ,useEffect } from 'react'
import './index.less'
import img from '../../../assets/162356646.jpg'

const FlowChartRect = (props: any) => {
    let [name, setName] = useState(null)
    useEffect(() => {
        console.log('props', props);
        setName(props.text);
    }, [])
    return (
        <div className='flow-chart-node'>
            {/* <div className='flow-chart-node-title'>{name}</div> */}
            <img width='80' height='80' src={img} alt="" />
        </div>
    )
}

export default FlowChartRect