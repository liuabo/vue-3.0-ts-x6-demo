import { useState ,useEffect } from 'react'
import image from '../../../assets/162356646.jpg'

import './index.less'

const FlowChartDiamond = (props: any) => {
    let [name, setName] = useState(null)
    useEffect(() => {
        console.log('props', props);
        setName(props.text);
    }, [])

    return (
        <div className='flow-chart-diamond'>
            {/* <div className='flow-chart-diamond-title'>{name}</div> */}
            <img width='65' height='65' src={image} alt="" />
        </div>
    )
}

export default FlowChartDiamond