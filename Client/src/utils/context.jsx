import { useState, createContext } from "react";
const Context = createContext();
export default Context;

export const AppContext = ({children}) => {
    const [userName, setUserName] = useState(undefined);
    const [userID, setUserID] = useState(undefined);
    const [loginCode, setLoginCode] = useState(-1);
    const [loginType, setLoginType] =  useState(false);
    const [image, setImage] = useState('')
    const [productDetails, setProductDetails] = useState('');
    const [name, setName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    return (
        <Context.Provider value = {
            {
                userName, setUserName,
                userID, setUserID,
                loginCode, setLoginCode,
                loginType, setLoginType,
                productDetails, setProductDetails,
                name, setName,
                displayName, setDisplayName,
                price, setPrice,
                color, setColor,
                description, setDescription,
                quantity, setQuantity,
                image, setImage
            }
        }>
            {children}
        </Context.Provider>
    );
}
