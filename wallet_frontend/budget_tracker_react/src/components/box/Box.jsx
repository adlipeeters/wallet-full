import React from 'react'
import './box.scss'

const Box = props => {
    const className = {
        box: 'box',
        purple: props.purple && 'box-purple',
        custom: props.custom && 'box-custom',
        centered: props.centered && 'box-centered',
        relative: props.relative && 'box-relative',
        fullheight: props.fullheight && 'box-fullheight'
    }

    return (
        <div className={Object.values(className).join(' ')}>
            {props.children}
        </div>
    )
}

export default Box
