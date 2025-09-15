// Mostra o host/IP da página
document.getElementById("host").textContent = window.location.host;

// Ambiente: se o hostname tiver "testing" ou "production", muda o label.
// (Por enquanto fica "unknown"; depois o pipeline pode sobrescrever.)
const envEl = document.getElementById("env");
const h = window.location.host.toLowerCase();
if (h.includes("test")) envEl.textContent = "testing";
else if (h.includes("prod")) envEl.textContent = "production";
else envEl.textContent = "unknown";
