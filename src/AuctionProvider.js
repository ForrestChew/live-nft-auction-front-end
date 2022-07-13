import { useState, createContext } from "react";

export const AuctionContext = createContext(null);

const AuctionProvider = ({ children }) => {
  // Boolean value indicating whether the auction is currently active or not.
  const [isAuctionActive, setIsAuctionActive] = useState(null);

  return (
    <AuctionContext.Provider value={[isAuctionActive, setIsAuctionActive]}>
      {children}
    </AuctionContext.Provider>
  );
};

export default AuctionProvider;
