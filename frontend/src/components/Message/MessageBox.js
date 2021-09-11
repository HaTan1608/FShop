import React, { useEffect } from "react"
const MessageBox = ({ messData }) => {


    const toastFunction = (type, title, message) => {
        const main = document.getElementById("toast");
        if (main) {
            const toast = document.createElement("div");

            // Auto remove toast
            const autoRemoveId = setTimeout(function () {
                main.removeChild(toast)
            }, 6000);

            // Remove toast when clicked
            toast.onclick = (e) => {

                if (e.target.closest(".toast")) {
                    main.removeChild(toast);
                    clearTimeout(autoRemoveId);
                }
            };

            const icons = {
                success: "fas fa-check-circle",
                info: "fas fa-info-circle",
                warning: "fas fa-exclamation-circle",
                error: "fas fa-exclamation-circle"
            };
            const icon = icons[type];
            const delay = (5000 / 1000).toFixed(2);

            toast.classList.add("toast", `toast--${type}`);
            toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

            toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fas fa-times"></i>
            </div>
        `;
            main.appendChild(toast);
        }
    }
    useEffect(() => {
        if (messData.open === true) {
            toastFunction(messData.type, messData.title, messData.content)
        }
    }
        , [messData])
    return (
        <div id="toast"></div>
    )
}
export default MessageBox