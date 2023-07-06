import axios from 'axios';
export default async function API(url,formData,flag){
    console.log(formData);
    try{
        const response = flag ? await axios.post("http://localhost:5000" + url,formData) : await axios.get("http://localhost:5000" + url);
        const data = response?.data;
        return data;
    }
    catch (err ) {
        console.log(err);
        return err;
    }
}