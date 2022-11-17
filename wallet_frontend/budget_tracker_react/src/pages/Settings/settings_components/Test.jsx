import React, { useState } from 'react'

const Test = () => {
    const [show, setShow] = useState(false)
    return (
        <div>
            <button onClick={() => setShow(!show)}>Show</button>
            <input type="checkbox" checked={show} id="my-modal" className="modal-toggle" readOnly/>
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn" onClick={() => setShow(!show)}>Yay!</label>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Test