export async function getMovie(title) {
    const url = `https://www.omdbapi.com/?apikey=${APIKey}&t=${title}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }
}

export function capitalizeString(string) {
    return string[0].toUpperCase() + string.slice(1);
}
