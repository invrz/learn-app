import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you might want to handle the form submission, e.g., sending data to a server.
    try{
      console.log("lol")
    }catch(err: any){
      setLoginError(err.message)
    }
  };

  return (
    <div className='page-view bg-body-dark'>
      <div className='grid-row col-height-10 row-center row-middle'>
        
        <div className='col-width-5-ld col-width-10-sq col-width-15-sm padding--small'>
          <form onSubmit={handleSubmit} className='col-height-auto bg-body border--smoother padding--small border--thin border--solid border-muted'>
            <br/><br/>
            <div className='logo'>
              <p>
                <span>i</span>&nbsp;&nbsp;
                <span className='invrz'>n</span>&nbsp;&nbsp;
                <span className='invrz'>v</span>&nbsp;&nbsp;
                <span className='invrz'>r</span>&nbsp;&nbsp;
                <span>z</span>
              </p>
              <p>get into your ^ account</p>
            </div>
            <br/><br/>

            <input placeholder='username or email id' className='textInput border--smooth bg-body text-body border--solid border--thin border-muted' type='text' value={username} onChange={(e)=>{setUsername(e.target.value)}} /><br/>
            <NavLink to="/" className="text--regular text-body noDecoration ">Forgot Username ?</NavLink>
            <br/><br/>

            <input placeholder='password' className='textInput border--smooth bg-body text-body border--solid border--thin border-muted' type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} /><br/><br/>

            <input type='submit' className='buttonInput border--smooth bg-body text-body border--solid border--thin border-muted' value="Get OTP" /><br/><br/>
            <NavLink to="/signup" className="text--regular text-body noDecoration ">Don't have an account ? <span className='underline'>Sign Up</span>, Or login with</NavLink><br/><br/><br/>

            <div className='grid-row col-width-15-ld col-width-15-sm col-width-15-sq'>

              <button className='buttonInput border--smooth bg-body text-body border--solid border--thin border-muted'>google</button>&nbsp;&nbsp;
              <button className='buttonInput border--smooth bg-body text-body border--solid border--thin border-muted'>facebook</button>
              
            </div>

            
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
