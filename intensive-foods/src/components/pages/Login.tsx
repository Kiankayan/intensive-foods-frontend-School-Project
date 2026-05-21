function Login() {
  return (
    <div className="vh-100 d-grid justify-content-center align-content-center">
      <h1 className="mb-4 text-center">Login</h1>
      <div className="p-5 shadow rounded-3">
        {" "}
        <form>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input className="form-control login-input" />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input className="form-control login-input" />
          </div>
          <div className="d-grid justify-content-center mt-4 ">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
