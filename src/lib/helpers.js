export async function getComments(url){
    const res = await fetch(url)
    if(!res.ok){
        throw{
            message: "Failed to fetch records",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data
}