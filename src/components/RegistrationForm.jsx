import '../styles/RegistrationForm.css';

const RegistrationForm = ({errors, register, handleSubmit, isLogin, setIsLogin, onSubmitReg}) => {
  return (
    <>
        <h2>Registration Form</h2>
        <form id='reg-form' onSubmit={handleSubmit(onSubmitReg)}>
            <label htmlFor='name'>Name</label>
            <input
                id='name'
                aria-invalid={errors.name ? 'true' : 'false'}
                {...register('name', { required: true })}
            />
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
            <button type='submit'>Register</button>
        </form>
        <span onClick={() => setIsLogin(!isLogin)}>Login</span>
    </>
  )
}

export default RegistrationForm