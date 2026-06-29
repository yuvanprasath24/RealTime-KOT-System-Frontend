import API from "./api";

export const getUser = async () => {
    try{
        const respone = await API.get('/restaurant/me');
        return (respone.data.data);
    }
    catch(err){
        console.error(err);
    }
}