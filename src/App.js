import './App.css';


function App() {
  return (
    <div className="App">
      
      <div className="header"><h1>Please fill out a request form</h1></div>
      <div className="container">
      <form action="">

      <label htmlFor="inputFname" className='form-label'>Firstname :</label>
      <div className="col-sm-10">
      <input type="text" class="form-control" id="inputFirstname" placeholder="Firstname(English)" required/>
      </div>

      <label htmlFor="inputLname" className='form-label'>Lastname :</label>
      <div className="col-sm-10">
      <input type="text" class="form-control" id="inputLastname" placeholder="Lastname(English)" required/>
      </div>

      <label htmlFor="UserType" className='form-label'> User Type :</label>
      <div className="col-sm-10">
      <select name="userType" className='form-select' id="inputUsertype">
          <option value="staff">Staff</option>
          <option value="internship">Internship</option>
          <option value="guest">Guest</option>
      </select>
      </div>

      <label htmlFor="tel" className='form-label'>Tel :</label>
      <div className="col-sm-10">
      <input type="text" class="form-control" id="inputTel" placeholder="055xxxxxxx" required/>
      </div>

      <label htmlFor="email" className='form-label'>Email :</label>
      <div className="col-sm-10">
      <input type="email" class="form-control" id="inputEmail" placeholder="admin@gmail.com" required/>
      </div>

      <label htmlFor="DeviceType" className='form-label'> Device Type :</label>
      <div className="col-sm-10">
      <select name="deviceType" className='form-select' id="inputDevicetype">
          <option value="mobile">Mobile</option>
          <option value="notebook">Notebook</option>
          <option value="tablet">Tablet</option>
          <option value="ipad">Ipad</option>
          <option value="etc.">etc. please fill</option>
      </select>
      </div>

      <label htmlFor="deviceBrand" className='form-label'>Device Brand :</label>
      <div className="col-sm-10">
      <input type="text" class="form-control" id="inputdeviceBrand" placeholder="Apple , Sumsung , ..." required/>
      </div>

      <label htmlFor="deviceName" className='form-label'>Device Name :</label>
      <div className="col-sm-10">
      <input type="text" class="form-control" id="inputdeviceName" placeholder="" required/>
      </div>

      <label htmlFor="startDate" className='form-label'>Start Date :</label>
      <div className="col-sm-10">
      <input type="date" class="form-control" name="startDate" id="startDate" required/>
      </div>

      <label htmlFor="endDate" className='form-label'>End Date :</label>
      <div className="col-sm-10">
      <input type="date" class="form-control" name="endDate" id="endDate" required/>
      </div>

      <label htmlFor="remark" className='form-label'>Remark :</label>
      <div className="col-sm-10">
      <input type="text" class="form-control" name="remark" id="remark" required/>
      </div>

      <input type="submit" className='btn btn-primary' value="Submit" />


      </form>
      </div>
      
      
    </div>
  );
}

export default App;
