export async function getMovie(title) {
    const APIKey = document.querySelector(".api-key").value;
    const url = `https://www.omdbapi.com/?apikey=${APIKey}&t=${title}`;
    const APIKeyErrorEl = document.querySelector(".api-key-error");
    const generalErrorEl = document.querySelector(".general-error");

    try {
        // Clear previous error messages if any
        APIKeyErrorEl.textContent = "";
        generalErrorEl.textContent = "";
        if (!APIKey) {
            APIKeyErrorEl.textContent = "API raktas yra būtinas!";
            throw new Error("API key is required!");
        }

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 401) {
                APIKeyErrorEl.textContent = "Netinkamas API raktas!";
                throw new Error("Invalid API key");
            } else {
                generalErrorEl.textContent = "Šiuo metu paslauga neprieinama, bandykite vėliau!";
                throw new Error(`Response status: ${response.status}`);
            }
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
        return;
    }
}

export function capitalizeString(string) {
    return string[0].toUpperCase() + string.slice(1);
}
