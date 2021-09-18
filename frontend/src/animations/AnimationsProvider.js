import React, { useEffect } from "react";
import AnimationsContext from "./AnimationsContext";

const AnimationsProvider = ({ children }) => {
    const scrollAnimations = () => {
        const elements = document.querySelectorAll('.animation');
        elements.forEach((element) => {
            const elementPosition = element.getBoundingClientRect().top;
            const viewPortHeight = window.innerHeight - 100;
            if (elementPosition < viewPortHeight) {
                element.classList.add('animate');
            } else {
                element.classList.remove('animate');
            }
        })
    }
    useEffect(() => {
        window.addEventListener('scroll', scrollAnimations)
    }, [])
    return (
        <AnimationsContext.Provider value>
            {children}
        </AnimationsContext.Provider>
    )
}
export default AnimationsProvider