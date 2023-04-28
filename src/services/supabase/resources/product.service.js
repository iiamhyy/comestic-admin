import supabase from "..";

export const fetchProductData = async () => {
    const { data } = await supabase.from("product").select();
    if(data) {
        return data;

    }else{
        return [];
    }

    console.log(data);
};
