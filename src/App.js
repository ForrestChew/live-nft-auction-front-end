import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { getAuctionState } from "./helpers/read-functions";
import { AuctionContext } from "./AuctionProvider";
import { getReadOnlyAuctionInstance } from "./helpers/utils";
import Navbar from "./components/navbar/Navbar";
import OptionsBox from "./components/options-box/OptionsBox";
import MainDisplay from "./components/main-display/MainDisplay";
import Profile from "./pages/profile/Profile";
import "./App.css";

function App() {
  const [isAuctionActive, setIsAuctionActive] = useContext(AuctionContext);

  useEffect(() => {
    setAuctionState();
  }, []);

  const setAuctionState = async () => {
    setIsAuctionActive(await getAuctionState());
  };

  const auction = getReadOnlyAuctionInstance();

  useEffect(() => {
    auction.on("AuctionStatus", () => {
      setAuctionState();
    });
    return () => auction.removeListener("AuctionStatus");
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
