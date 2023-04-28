import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import logo from "../../Assets/imgs/Group8.png"
import { LoginForm } from "../../Constants/StyledComponents";
import { UserContext } from "../../Constants/userContext";
import { ThreeDots } from 'react-loader-spinner'
import { url } from "../../Constants/urls";
import { PageContainer } from "./SignInStyles";

export default function SignInPage() {
    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useContext(UserContext);
    const [disable, setDisable] = useState(false);
    const [form, setForm] = useState({email: "", password: ""});

    if(localStorage.getItem('userInfo') !== null) {
        setUserInfo(localStorage.getItem('userInfo'));
        navigate("/hoje");
    }

    function handleForm (e) {
        setForm({
            ...form,
            [e.currentTarget.name]: e.currentTarget.value,
          });
    }

    function handleClick (e) {
    setDisable(true);
    e.preventDefault();

    console.log(form)

    axios.post(`${url}/auth/login`, form)
    .then (res => {
        setUserInfo(res.data);
        delete res.data.password;
        delete res.data.email;
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        navigate("/hoje")
    })
    .catch(err => {
        alert(err.response.data.message)
        setDisable(false);
    })
    }

    
    return (
        <PageContainer>
            <img src={logo} alt="Trackt Logo"/>
            <LoginForm onSubmit={handleClick}>
                <input required disabled={disable} data-identifier="input-email" type="email" onChange={handleForm}     name="email" placeholder="email"></input>
                <input required disabled={disable} type="password" data-identifier="input-password" onChange={handleForm}     name="password" placeholder="senha"></input>
                <button data-identifier="login-btn" disabled={disable} type="submit" >{disable 
                ?
                <ThreeDots 
                height="30" 
                width="80" 
                radius="9"
                color="white" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
                 />
                  :
                  "Entrar"}</button>
                
               
            </LoginForm>

            <Link data-identifier="sign-up-action" to="/cadastro">  <p>Não tem uma conta? Cadastre-se</p></Link>
          
        </PageContainer>
    )
}


