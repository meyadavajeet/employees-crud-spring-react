// import logo from "./logo.svg";
import "./App.css";
// Importing toastify module 
import {toast} from 'react-toastify'; 
// Import toastify css file 
import 'react-toastify/dist/ReactToastify.css';  
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import ListOfEmployeesComponents from "./components/ListOfEmployeesComponents";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import CreateEmployeesComponents from "./components/CreateEmployeesComponents";
import ViewEmployeeComponents from "./components/ViewEmployeeComponents";


// toast-configuration method,  
 // it is compulsory method. 
 toast.configure() 

function App() {
    return (
        <>
            <Router>
                <HeaderComponent/>
                <div className="container-fluid">
                    <div className="container">
                        <Switch>
                            <Route exact path={"/"} component={ListOfEmployeesComponents}></Route>
                            <Route exact path={"/employees-list"} component={ListOfEmployeesComponents}></Route>
                            <Route exact path={"/create-employees/:id"} component={CreateEmployeesComponents}></Route>
                            <Route exact path={"/view-employees/:id"} component={ViewEmployeeComponents}></Route>
                            {/* <Route exact path={"/update-employees/:id"} component={updateEmployeeComponent}></Route> */}
                            <ListOfEmployeesComponents/>
                        </Switch>
                    </div>
                </div>
                <FooterComponent/>
            </Router>
        </>
    );
}

export default App;
