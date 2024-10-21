import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OwnerProtected = ({children}) => {
    const {user} = useSelector(store=>store.auth);

    const navigate = useNavigate();

    useEffect(()=>{
        if(user === null || user.role!=='owner'){
            navigate("/admin");
        }
    },[]);

    return (
        <>
        {children}
        </>
    )
};
export default OwnerProtected;