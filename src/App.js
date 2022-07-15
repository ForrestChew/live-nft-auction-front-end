import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { getAuctionState } from "./helpers/contract-interactions/read-functions";
import { AuctionContext } from "./AuctionProvider";
import Navbar from "./components/navbar/Navbar";
import OptionsBox from "./components/options-box/OptionsBox";
import MainDisplay from "./components/main-display/MainDisplay";
import Profile from "./pages/profile/Profile";
import "./App.css";

function App() {
  const [isAuctionActive, setIsAuctionActive] = useContext(AuctionContext);

  useEffect(() => {
    const setAuctionState = async () => {
      setIsAuctionActive(await getAuctionState());
    };
    setAuctionState();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="auction">
              <MainDisplay />
              <OptionsBox />
            </div>
          }
        ></Route>
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
