export async function doFetch(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const json = await response.json();
    return json.data;
}
