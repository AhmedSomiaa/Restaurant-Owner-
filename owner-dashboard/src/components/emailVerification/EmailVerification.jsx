import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux';
import success from "../../images/success.png"
import failure from "../../images/404.jpg"
import "./emailVerification.css"

function EmailVerification() {

    const [validUrl, setValidUrl] = useState(true);
    const param = useParams();


    useEffect(() => {
        const verifyEmail = async () => {
            try {
                console.log(param.token)
                const { data } = await axios.post(`http://localhost:3000/api/owners/verify/${param.token}`);
                console.log(data)
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmail();
    }, [param.token]);


    return (
        <>
            {validUrl ? (
                <div className="emailVerficationContainer">
                    <img src={success} alt="success_img" className="success_img" />
                    <h1>Email verified successfully</h1>
                    <Link to="/">
                        <button className="green_btn">Login</button>
                    </Link>
                </div>
            ) : (
                <div className="emailVerficationContainer">
                    <img src={failure} alt="404" />
                </div>
            )
            }
        </>
    )
};

export default EmailVerification