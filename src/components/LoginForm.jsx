import '../styles/LoginForm.css';

const LoginForm = ({errors, register, handleSubmit, isLogin, setIsLogin, onSubmitLogin}) => {
  return (
    <>
        <h2>Login</h2>
        <form id='login-form' onSubmit={handleSubmit(onSubmitLogin)}>
            <label htmlFor='email'>Email</label>
            <input
                id='email'
                aria-invalid={errors.email ? 'true' : 'false'}
                {...register('email', { required: true })} 
            />
            {errors.email && <span style={{ color: 'red' }}>*Email* is mandatory</span>}
            <label htmlFor='password'>Password</label>
            <input
                id='password'
                aria-invalid={errors.password ? 'true' : 'false'}
                {...register('password')}
            />
            <button type='submit'>Login</button>
        </form>
        <span onClick={() => setIsLogin(!isLogin)}>New User</span>
    </>
  )
}

export default LoginForm