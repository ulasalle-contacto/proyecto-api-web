
const boton = document.getElementById("boton-consejo");
const numeroConsejo = document.getElementById("numero-consejo");
const textoConsejo = document.getElementById("texto-consejo");

async function consultarConsejo() {
    try {
        boton.disabled = true;
        textoConsejo.textContent = "Cargando consejo...";

        const respuesta = await fetch(
            "https://api.adviceslip.com/advice",
            { cache: "no-store" }
        );

        if (!respuesta.ok) {
            throw new Error("Error al consultar la API");
        }

        const datos = await respuesta.json();

        numeroConsejo.textContent =
            "Consejo #" + datos.slip.id;

        textoConsejo.textContent =
            datos.slip.advice;

    } catch (error) {
        console.error("Ocurrió un error:", error);

        textoConsejo.textContent =
            "No fue posible cargar el consejo.";

    } finally {
        boton.disabled = false;
    }
}

boton.addEventListener("click", consultarConsejo);

consultarConsejo();
