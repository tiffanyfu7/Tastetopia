import {Link} from "react-router-dom";

const CreateAccount = () => {
    return (
        <>
            <div className='login-main'>
                <div className='login-main-header'>
                    <h1> Create Account </h1>
                </div>
                <div className='login-boxes'>
                    <input placeholder='username'>
                    </input>
                    <input type='password' placeholder='password' >
                    </input>
                </div>
                <div className='login-option'>
                    <Link to={"/"}>
                        <span>Log in</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default CreateAccount;