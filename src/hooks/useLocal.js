
export const useLocal =(key,keyOne)=>{
    const obj=JSON.parse(localStorage.getItem(key))
    const objOne=JSON.parse(localStorage.getItem(keyOne))
    return [obj,objOne]
}