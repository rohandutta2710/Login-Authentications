import React from 'react';
import MainFile from './MainFile';
import Login from './Login';
import NewUser from './NewUser';
import UpdateDetails from './UpdateDetails';
import DeleteUser from './DeleteUser';
import { Route, Switch } from 'react-router-dom';
const Routing = () => {
    return (<Switch>
        <Route exact path="/" component={MainFile}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/updatedetails" component={UpdateDetails}></Route>
        <Route exact path="/newuser" component={NewUser}></Route>
        <Route exact path="/deleteuser" component={DeleteUser}></Route>
    </Switch>);
}
export default Routing;