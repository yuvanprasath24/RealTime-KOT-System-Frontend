import axios from "axios"

export const CloseOrder = async (orders,restaurantID) => {
    try{
        const respone = await axios.patch(`http://127.0.0.1:8080/public/api/${orders.id}/close?restaurantID=${restaurantID}`);
        console.log(respone.data.data);
    }
    catch(err){
        console.error(err);
    }
}