import './App.css';
import Header from "./components/Header";
import {Cart, Home} from "./pages";
import {Route} from "react-router-dom";


function App() {


    return (
        <div className="wrapper">

            <Header/>
            <div className="content">
                <Route exact path={'/'} render={() => <Home/>}/>
                <Route path={'/cart'} render={() => <Cart/>}/>
            </div>
        </div>
    );
}


export default App;
