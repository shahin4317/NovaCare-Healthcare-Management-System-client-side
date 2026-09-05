import { baseUrl } from "./baseUrl"


export const serverMutation = async (path, method, data) => {
    console.log(baseUrl, "url");
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return res.json()
}

export const deleteMutation = async (path) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: "DELETE",
    })
    return res.json()

}



export const serverfetch = async (path) => {

    const res = await fetch(`${baseUrl}${path}`)
    return res.json()

}