import {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import GameScreen from "./components/screens/game/GameScreen";
import VideoScreen from "./components/screens/video/VideoScreen";
import HomeScreen from "./components/screens/HomeScreen";
import UserScreen from "./components/screens/user/UserScreen";
import CouponScreen from "./components/screens/coupon/CouponScreen";
import ReportScreen from "./components/screens/report/ReportScreen";

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
                    <Route exact path="/user">
                        <UserScreen />
                    </Route>
                    <Route exact path="/coupon">
                        <CouponScreen />
                    </Route>
                    <Route exact path="/report">
                        <ReportScreen />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
