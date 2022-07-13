import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { useMoralisQuery } from "react-moralis";
import { AuctionContext } from "./AuctionProvider";
import Navbar from "./components/navbar/Navbar";
import OptionsBox from "./components/options-box/OptionsBox";
import MainDisplay from "./components/main-display/MainDisplay";
import Profile from "./pages/profile/Profile";
import "./App.css";

function App() {
  const [isAuctionActive, setIsAuctionActive] = useContext(AuctionContext);

  // Gets the data from the "auctionStatus" class within the Moralis DB.
  const { data, isLoading } = useMoralisQuery("auctionStatus", (q) => q, [], {
    onCreate: () => setAuctionStatus(),
    onDelete: () => setAuctionStatus(),
    live: true,
  });

  useEffect(() => {
    setAuctionStatus();
  }, [data]);

  const setAuctionStatus = async () => {
    if (data.length !== 0) {
      setIsAuctionActive(true);
    } else {
      setIsAuctionActive(false);
    }
  };

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="auction">
              <MainDisplay isLoading={isLoading} />
              <OptionsBox isLoading={isLoading} />
            </div>
          }
        ></Route>
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
