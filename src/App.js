import './App.css';
import {useState} from 'react'


function App() {

  
  const [IsDisable,setIsDisable] = useState('true');
  const [etcDisable,setetcDisable] = useState('true');

  const Check = (value) => {
      if(value=="staff"){
        setIsDisable(true);
        
      }else if(value!="staff"){
        setIsDisable(false);
        
      }
  };

  const Checketc = (value) => {
    if(value=="etc."){
      setetcDisable(false);
      
    }else if(value!="etc."){
      setetcDisable(true);
      
    }
};
  

  

  return (
    <div className="App">
      
      <div className="header"><h1>Please fill out a request form</h1></div>
      <div className="container">
      <form action="">

      <label htmlFor="inputFname" className='form-label'>Firstname :</label>
      <div className="col-sm-10">
      <input type="text" className="form-control" id="inputFirstname" placeholder="Firstname(English)" />
      </div>

      <label htmlFor="inputLname" className='form-label'>Lastname :</label>
      <div className="col-sm-10">
      <input type="text" className="form-control" id="inputLastname" placeholder="Lastname(English)" />
      </div>

      <label htmlFor="UserType" className='form-label'> User Type :</label>
      <div className="col-sm-10">
      <select name="userType" className='form-select' id="inputUsertype" onChange={(e) => Check(e.target.value)}>
          <option value="staff" >Staff</option>
          <option value="internship">Internship</option>
          <option value="guest">Guest</option>
      </select>
      </div>

      <label htmlFor="tel" className='form-label'>Tel :</label>
      <div className="col-sm-10">
      <input type="text" className="form-control" id="inputTel" placeholder="055xxxxxxx" />
      </div>

      <label htmlFor="email" className='form-label'>Email :</label>
      <div className="col-sm-10">
      <input type="email" className="form-control" id="inputEmail" placeholder="admin@gmail.com" />
      </div>

      <label htmlFor="DeviceType" className='form-label'> Device Type :</label>
      <div className="col-sm-10">
      <select name="deviceType" className='form-select' id="inputDevicetype" onChange={(e) => Checketc(e.target.value)}>
          <option value="mobile">Mobile</option>
          <option value="notebook">Notebook</option>
          <option value="tablet">Tablet</option>
          <option value="ipad">Ipad</option>
          <option value="etc.">etc.</option>
      </select>
      </div>

      <div className="col-sm-10">
      <input disabled={etcDisable} type="text" className="form-control etc" id="inputEtc" placeholder="Etc please fill ..." />
      </div>

      <label htmlFor="deviceBrand" className='form-label'>Device Brand :</label>
      <div className="col-sm-10">
      <input type="text" className="form-control" id="inputdeviceBrand" placeholder="Apple , Sumsung , ..." />
      </div>

      <label htmlFor="deviceName" className='form-label'>Device Name :</label>
      <div className="col-sm-10">
      <input type="text" className="form-control" id="inputdeviceName" placeholder="" />
      </div>

      <label htmlFor="startDate" className='form-label'>Start Date :</label>
      <div className="col-sm-10">
      <input type="date" className="form-control" name="startDate" id="startDate" />
      </div>

      <label htmlFor="endDate" className='form-label'>End Date :</label>
      <div className="col-sm-10">
      <input disabled={IsDisable} type="date" className="form-control" name="endDate" id="endDate" />
      </div>

      <label htmlFor="remark" className='form-label'>Remark :</label>
      <div className="col-sm-10">
      <input type="text" className="form-control" name="remark" id="remark" />
      </div>

      <input  type="" className='btn btn-primary' value="Submit" />


      </form>
      </div>
      
      
    </div>
  );
}

export default App;
