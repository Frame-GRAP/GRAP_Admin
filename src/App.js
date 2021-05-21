import {useState} from 'react';
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Main from "./components/screens/Main";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Game from "./components/screens/game/Game";
import GameScreen from "./components/screens/game/GameScreen";
import VideoScreen from "./components/screens/video/VideoScreen";
import HomeScreen from "./components/screens/HomeScreen";

function App() {
    const [sidebarOpen, setsidebarOpen] = useState(false);

    const openSidebar = () => {
        setsidebarOpen(true);
        console.log(sidebarOpen);
    };
    const closeSidebar = () => {
        setsidebarOpen(false);
        console.log(sidebarOpen);
    };
    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <HomeScreen />
                    </Route>
                    <Route exact path="/game">
                        <GameScreen />
                    </Route>
                    <Route exact path="/video">
                        <VideoScreen />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
