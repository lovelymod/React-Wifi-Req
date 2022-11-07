import './App.css';


function App() {
  return (
    <div className="App">
      
      <div className="header"><h1>Please fill out a request form</h1></div>

      <form action="">

            <label htmlFor="inputFname">Firstname :</label>
            <input type="text" class="" id="inputFirstname" placeholder="Firstname(English)" required/>

            <label htmlFor="inputLname">Lastname :</label>
            <input type="text" class="" id="inputLastname" placeholder="Lastname(English)" required/>

            <label htmlFor="UserType"> User Type :</label>
            <select name="userType" id="inputUsertype">
                <option value="staff">Staff</option>
                <option value="internship">Internship</option>
                <option value="guest">Guest</option>
            </select>

            <label htmlFor="tel">Tel :</label>
            <input type="number" class="" id="inputTel" placeholder="055xxxxxxx" required/>
            
            <label htmlFor="email">Email :</label>
            <input type="email" class="" id="inputEmail" placeholder="admin@gmail.com" required/>

            <label htmlFor="DeviceType"> Device Type :</label>
            <select name="deviceType" id="inputDevicetype">
                <option value="mobile">Mobile</option>
                <option value="notebook">Notebook</option>
                <option value="tablet">Tablet</option>
                <option value="ipad">Ipad</option>
                <option value="etc.">etc. please fill</option>
            </select>

            <label htmlFor="deviceBrand">Device Brand :</label>
            <input type="text" class="" id="inputdeviceBrand" placeholder="Apple , Sumsung , ..." required/>

            <label htmlFor="deviceName">Device Name :</label>
            <input type="text" class="" id="inputdeviceName" placeholder="" required/>
        
            <label htmlFor="startDate">Start Date :</label>
            <input type="date" name="startDate" id="startDate" required/>

            <label htmlFor="endDate">End Date :</label>
            <input type="date" name="endDate" id="endDate" required/>

            <label htmlFor="remark">Remark :</label>
            <input type="text" name="remark" id="remark" required/>

            <input type="submit" value="Submit" />
            

        </form>
      
    </div>
  );
}

export default App;
