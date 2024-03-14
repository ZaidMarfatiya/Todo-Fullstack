import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './utils/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';
import Todo from './components/Todo';
import Profile from './components/Profile';


function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <Navbar />
                    <Switch>
                        <Route component={Login} path="/login" />
                        <Route component={Register} path="/register" exact />
                        <Route component={Homepage} path="/" exact />
                        <PrivateRoute component={Todo} path="/todo" exact />
                        <PrivateRoute component={Profile} path="/profile" exact />
                    </Switch>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
