import "./login.css";

function Login() {
  return (
    <div className="App2">
      <div className="bg2">
        <div className="images">
          <img className="logo" src="img/LS-01.png" alt="" srcSet="" />
        </div>
        <div className="container">
          <form>
            <div className="row-contain">
              <label htmlFor="Username" className="form-label">
                Username :
              </label>

              <input
                type="text"
                className="form-control"
                id=""
                placeholder=""
              />
            </div>
            <div className="row-contain">
              <label htmlFor="Password" className="form-label">
                Password :
              </label>

              <input
                type="text"
                className="form-control"
                id=""
                placeholder=""
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
