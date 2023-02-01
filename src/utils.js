const ORIGIN = 'http://localhost:5000'

export function POST(endpoint,data,callback=()=>{}) {
    fetch(`${ORIGIN}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res=>res.json()))
    .then(callback)
}

export function GET(endpoint,callback=()=>{}) {
    fetch(`${ORIGIN}${endpoint}`)
    .then(response => response.json())
    .then(callback);
}
