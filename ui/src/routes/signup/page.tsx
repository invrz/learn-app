import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bYear, setBYear] = useState("");
  const [bMonth, setBMonth] = useState("");
  const [bDay, setBDay] = useState("");
  const [gender, setGender] = useState("");

  const [signupError, setSignupError] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you might want to handle the form submission, e.g., sending data to a server.
    try{
      alert("lol")
    }catch(err: any){
      setSignupError(err.message)
    }
  };

  return (
    <div className='page-view bg-body-dark'>
      <div className='grid-row col-height-10 row-center row-middle '>
        
        <div className='col-width-5-ld col-width-10-sq col-width-15-sm padding--small'>
          <form onSubmit={handleSubmit} className='col-height-auto bg-body border--smoother padding--small border--thin border--solid border-muted'>

            <div className='logo'>
              <p>
                <span>i</span>&nbsp;&nbsp;
                <span className='invrz'>n</span>&nbsp;&nbsp;
                <span className='invrz'>v</span>&nbsp;&nbsp;
                <span className='invrz'>r</span>&nbsp;&nbsp;
                <span>z</span>
              </p>
              <p>sign up for your ^ account</p>
            </div>
            <br/><br/>

            <label className='grayText smallText'>tell us your name</label><br/>
            <input placeholder='First Last' className='textInput border--smooth bg-body text-body border--solid border--thin border-muted' type='text' value={name} onChange={(e)=>{setName(e.target.value)}} /><br/>
            <br/>

            <label className='grayText smallText'>pickup a username</label><br/>
            <input placeholder='NiceUserName' className='textInput border--smooth bg-body text-body border--solid border--thin border-muted' type='text' value={username} onChange={(e)=>{setUsername(e.target.value)}} /><br/>
            <br/>
            
            <label className='grayText smallText'>set a password</label><br/>
            <input placeholder='aDgh4357##5c' className='textInput border--smooth bg-body text-body border--solid border--thin border-muted' type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} /><br/>
            <br/>
            
            <label className='grayText smallText'>confirm your password</label><br/>
            <input placeholder='aDgh4357##5c' className='textInput border--smooth bg-body text-body border--solid border--thin border-muted' type='password' value={cnfPassword} onChange={(e)=>{setCnfPassword(e.target.value)}} /><br/>
            <br/>
            
            <label className='grayText smallText'>your email id</label><br/>
            <input placeholder='user@domain' className='textInput border--smooth bg-body text-body border--solid border--thin border-muted' type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} /><br/>
            <br/>
            
            <label className='grayText smallText'>gender</label><br/>
            <select className='textInput border--smooth bg-body text-body border--solid border--thin border-muted' onChange={(e)=>{setEmail(e.target.value)}}>
              <option value={0}>Prefer not to say</option>
              <option value={1}>Male</option>
              <option value={2}>Female</option>
              <option value={3}>Others</option>
            </select><br/>
            <br/>
            
            <label className='grayText smallText'>and finally, your birthday</label><br/>

            <select className='dateInput textInput border--smooth bg-body text-body border--solid border--thin border-muted' onChange={(e)=>{setEmail(e.target.value)}} >
              <option>date</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
              <option value={16}>16</option>
              <option value={17}>17</option>
              <option value={18}>18</option>
              <option value={19}>19</option>
              <option value={10}>20</option>
              <option value={21}>21</option>
              <option value={22}>22</option>
              <option value={23}>23</option>
              <option value={24}>24</option>
              <option value={25}>25</option>
              <option value={26}>26</option>
              <option value={27}>27</option>
              <option value={28}>28</option>
              <option value={29}>29</option>
              <option value={30}>31</option>
              <option value={31}>31</option>
            </select>&nbsp;&nbsp;

            <select className='dateInput border--smooth bg-body text-body border--solid border--thin border-muted' onChange={(e)=>{setEmail(e.target.value)}} >
              <option>month</option>
              <option value={0}>January</option>
              <option value={0}>February</option>
              <option value={0}>March</option>
              <option value={0}>April</option>
              <option value={0}>May</option>
              <option value={0}>June</option>
              <option value={0}>July</option>
              <option value={0}>August</option>
              <option value={0}>September</option>
              <option value={0}>October</option>
              <option value={0}>November</option>
              <option value={0}>December</option>
            </select>&nbsp;&nbsp;<br/><br/>

            <input placeholder='year' className='textInput border--smooth bg-body text-body border--solid border--thin border-muted' type='number' value={bYear} onChange={(e)=>{setBYear(e.target.value)}} /><br/>

            <br/><br/>

            <input type='submit' className='buttonInput border--smooth bg-body text-body border--solid border--thin border-muted' value="Get OTP" /><br/><br/>
            <NavLink to="/" className="text text-body noDecoration ">Have an account already ? <span className='underline'>Log In</span></NavLink><br/><br/>


            
          </form>

        </div>
      </div>
    </div>
  );
};

export default Signup;
