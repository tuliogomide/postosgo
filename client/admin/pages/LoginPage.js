import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as AuthCreators } from '@store/ducks/auth';


const LoginPage = () => {

  const [localState, setLocalState] = React.useState({
    username: '',
    password: '',
  });

  const onChangeUsername = e => {
    const username = e.target.value;
    setLocalState({ ...localState, username });
  }

  const onChangePassword = e => {
    const password = e.target.value;
    setLocalState({ ...localState, password });
  }

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(AuthCreators.getAuthRequest(localState));
  }

  const { loading, error } = useSelector(state => state.auth);

  React.useEffect(() => {
    dispatch(AuthCreators.resetLogin());
  }, []);

  return (
    <div>
      <div className="row">
        <br /><br />
        <div className="col s12 m10 l10 xl6 offset-xl3 offset-l1 offset-m1">
          <div className="card">
            <div className="progress" style={{ visibility: loading ? "" : "hidden" }}>
              <div className="indeterminate"></div>
            </div>
            <center>
              <h4 className=""><b>Login</b></h4>
            </center>
            <div className="card-content">
              <div className="row">
                <div className="col s12 col m10 offset-m1 ">
                  <input placeholder="Usuário" id="usuario" type="text" className="validate" onKeyUp={onChangeUsername} />
                  <input id="senha" placeholder="Senha" type="password" className="validate" onKeyUp={onChangePassword} />
                  <br /><br />
                  {error && (
                    <div>{error}</div>
                  )}
                  <a className="waves-effect waves-light btn blue-custom right" onClick={onSubmit}>Login</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )

}

export default LoginPage;