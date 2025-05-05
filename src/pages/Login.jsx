import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import '../styles/Login.css';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isLogin, setIsLogin] = useState(true);

    const onSubmitReg = (data) => {
        localStorage.setItem(data.email, JSON.stringify({
            name: data.name, password: data.password
        }));
        console.log(JSON.parse(localStorage.getItem(data.email)));
    }

    const onSubmitLogin = (data) => {
        const userData = JSON.parse(localStorage.getItem(data.email));
        if(userData) {
            if(userData.password === data.password) {
                console.log(userData.name + ' logged in');
            } else {
                console.log('email or password is incorrect');
            }
        } else {
            console.log('email or password does not match within our record')
        }
    }

    useEffect(() => {
        console.log(isLogin);
    }, [isLogin]);
  return (
    <section id='login-page'>
        {isLogin 
            ? 
            <LoginForm 
                errors={errors} 
                register={register} 
                handleSubmit={handleSubmit} 
                isLogin={isLogin}
                setIsLogin={setIsLogin} 
                onSubmitLogin={onSubmitLogin} 
            /> 
            : 
            <RegistrationForm 
                errors={errors} 
                register={register} 
                handleSubmit={handleSubmit}
                isLogin={isLogin} 
                setIsLogin={setIsLogin} 
                onSubmitReg={onSubmitReg} 
            />
        }
    </section>
  )
}

export default Login;
