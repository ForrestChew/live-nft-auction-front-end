import { useState, createContext } from "react";

export const AuctionContext = createContext(null);

const AuctionProvider = ({ children }) => {
  const [isAuctionActive, setIsAuctionActive] = useState(null);

  return (
    <AuctionContext.Provider value={[isAuctionActive, setIsAuctionActive]}>
      {children}
    </AuctionContext.Provider>
  );
};

export default AuctionProvider;
