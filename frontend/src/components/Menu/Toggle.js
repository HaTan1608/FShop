import React, { useState } from "react";
const Toggle = ({ getOpen }) => {
    const [open, setOpen] = useState(false)
    const sendToggle = () => {
        getOpen();
        setOpen(!open);
    }
    return (
        <>

            {open ? <div className='navLayer' onClick={() => sendToggle()}></div> : ''}
            <div className={open ? 'toggle-close' : 'toggle-open'} onClick={() => sendToggle()}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </>
    )
}
export default Toggle;