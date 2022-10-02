import anime from '../assets/anime.json'
export function searchAnime(name,studio){
    return new Promise((resolve,reject)=>{
        const foundAnime =anime.find(
            (anime) =>anime.name === name || anime.studios === studio
        )
        setTimeout(()=>{
            if(foundAnime){
                resolve(foundAnime)
            }
            else{
                reject('Not Found')
            }
        },500)
    })
}
export function getAllAnime(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(anime){
                resolve(anime)
            }
            else{
                reject('Not Found')
            }
        },500)
    })
}