import React, { useContext, useRef } from 'react'
import './Form.scss';
import Context from '../../utils/context'
import API from  '../../api/axiosAPI'
export default function Form() {
    const { name, setName, image, setImage } = useContext(Context);
    const formRef = useRef(null);

    async function submit(event){
        event.preventDefault();
        let myForm = event.target;
        const formData = new FormData(myForm);
        // formData.append('name', name);
        // formData.append('image', image);
        console.log(formData);
        const response = await API('/',formData,false);
        console.log(response);
    }
  return (
    <form ref={formRef} onSubmit={submit} className="forms">
        <input type="text" name="name" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
        <input type="file" name="image" onChange={(e)=>{setImage(e.target.files[0])}}/>
        <input type='submit' value="submit"/>
    </form>
  )
}
