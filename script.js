
/* =========================================
   NOXAVETH NETWORK
   SISTEMA PRINCIPAL
========================================= */

// CONFIGURACIÓN

const CONFIG = {
    serverIP: "",
    discordURL: "https://discord.gg/g8jsHgKY6k"
};

// ELEMENTOS

const copyIpButton = document.getElementById("copyIpButton");
const serverIpElement = document.getElementById("serverIp");
const notification = document.getElementById("notification");
const footerCopyright = document.getElementById("footerCopyright");

let notificationTimeout;

// NOTIFICACIONES

function showNotification(message) {

    if (!notification) return;

    notification.textContent = message;
    notification.classList.add("show");

    clearTimeout(notificationTimeout);

    notificationTimeout = setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

// CONFIGURACIÓN DE IP

function initializeServerIP() {

    if (!copyIpButton || !serverIpElement) return;

    if (CONFIG.serverIP.trim() !== "") {

        serverIpElement.textContent = CONFIG.serverIP;
        copyIpButton.disabled = false;

    } else {

        serverIpElement.textContent =
            "IP DEL SERVIDOR: PRÓXIMAMENTE";

        copyIpButton.disabled = true;
    }
}

// COPIAR IP

if (copyIpButton) {

    copyIpButton.addEventListener("click", async () => {

        if (!CONFIG.serverIP.trim()) {
            showNotification("La IP todavía no está configurada.");
            return;
        }

        try {

            await navigator.clipboard.writeText(CONFIG.serverIP);

            showNotification("¡IP copiada correctamente!");

        } catch (error) {

            console.error("Error al copiar la IP:", error);

            showNotification("No se pudo copiar la IP.");

        }
    });
}

// DISCORD

document.querySelectorAll(
    'a[href="https://discord.gg/g8jsHgKY6k"]'
).forEach(link => {

    link.href = CONFIG.discordURL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

});

// ANIMACIONES

const animatedElements = document.querySelectorAll(
    ".section, .community, .game-card, .feature-item, .staff-card, .shop-card"
);

animatedElements.forEach(element => {
    element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);
            }
        });

    }, {
        threshold: 0.12
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

} else {

    animatedElements.forEach(element => {
        element.classList.add("active");
    });

}

// AÑO AUTOMÁTICO

if (footerCopyright) {

    footerCopyright.textContent =
        `© ${new Date().getFullYear()} Noxaveth Network. Todos los derechos reservados.`;

}

// INICIALIZACIÓN

initializeServerIP();

console.log("--------------------------------");
console.log("NOXAVETH NETWORK");
console.log("Sistemas iniciados correctamente.");
console.log("Versión compatible: 1.21.11");
console.log("--------------------------------");
