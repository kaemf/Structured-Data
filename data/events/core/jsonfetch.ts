export default async function FetchJSON(){
    return await fetch('./data/events/core/context.json').then((response) => response.json()).catch((error) => console.log(error))
}