import "./login.css";

function Login() {
  return (
    <div className="App2">
      <div className="bg2">
        <div className="images">
          <img className="logo" src="img/LS-02.png" alt="" srcSet="" />
        </div>
        <div className="container">
          <form>
            <div className="row-contain">
              <input
                type="text"
                className="form-control input"
                id=""
                placeholder="Username"
              />
            </div>
            <div className="row-contain">
              <input
                type="text"
                className="form-control input"
                id=""
                placeholder="Password"
              />
            </div>
            <input
                type=""
                className="btn regisbutt"
                value="Submit"
              />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
