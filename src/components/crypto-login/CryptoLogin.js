import { useState, useEffect, useContext } from "react";
import { useMoralis } from "react-moralis";
import { UserContext } from "../../UserProvider";
import "./CryptoLogin.css";

const CryptoLogin = () => {
  const [authedUser, setAuthedUser] = useContext(UserContext);
  const [shortenedAddr, setShortenedAddr] = useState("");
  const [shortenedBal, setShortenedBal] = useState("");
  const [balanceDisplay, setBalanceDisplay] = useState(0);

  const { Moralis, authenticate } = useMoralis();

  useEffect(() => {
    if (authedUser.isAuthed) {
      const userBalIsolate = Moralis.Units.FromWei(
        authedUser.userBal.toString()
      );
      // Shortens the max digits to a length of 6 as an authenticated user
      // will not need to see all decimal places in wei.
      const shortenedUserBal = userBalIsolate.substring(0, 6);
      setShortenedBal(shortenedUserBal);
    } else {
      setShortenedBal("");
    }
  }, [authedUser]);

  // Shortens the users address and disables the authentication button
  // if user is currently authenticated. Otherwise, the authentication
  // button will not be disabled.
  useEffect(() => {
    if (authedUser.isAuthed) {
      document.getElementById("login-btn").disabled = true;
      // Isolates the first several charactors of user's address
      const addressBegining = authedUser.userAddr.substring(0, 4);
      // Isolates the last several charactors of user's address
      const addressEnd = authedUser.userAddr.substring(37, 42);
      // Sets the user's shortened address to be displayed
      setShortenedAddr(
        addressBegining.concat(".".padEnd(6, ".")).concat(addressEnd)
      );
    } else {
      document.getElementById("login-btn").disabled = false;
    }
  }, [authedUser]);

  // Gets the currently authenticated user and sets the global user
  // context with the appropriate fields.
  const updateUser = async () => {
    try {
      const ethers = Moralis.web3Library;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signerAddr = await signer.getAddress();
      const signerBal = await signer.getBalance();
      setAuthedUser({
        userAddr: signerAddr,
        userBal: Number(signerBal),
        isAuthed: true,
      });
    } catch (e) {
      setAuthedUser({
        userAddr: "",
        userBal: "",
        isAuthed: false,
      });
    }
  };

  // Updates the global user context when the user changes
  // accounts in Metamask or the user logs out.
  window.ethereum.on("accountsChanged", () => {
    setAuthedUser(updateUser());
  });

  const login = async () => {
    // Disables button after clicked once
    document.getElementById("login-btn").disabled = true;
    // Authenticates user and sets the global user context with the
    // user's address, balance, and a boolean indicating whether
    // the user is authenticated.
    authenticate().then(async () => {
      updateUser();
    });
    document.getElementById("login-btn").disabled = false;
  };

  const toggleBalDisplay = () => {
    balanceDisplay === 1 ? setBalanceDisplay(0) : setBalanceDisplay(1);
  };

  return (
    <div className="login-container">
      <button id="login-btn" className="login-btn" onClick={login}>
        {authedUser.isAuthed ? shortenedAddr : "login"}
      </button>
      <button className="login-btn" onClick={toggleBalDisplay}>
        {balanceDisplay === 0 ? shortenedBal.concat(" Matic") : "Balance"}
      </button>
    </div>
  );
};

export default CryptoLogin;
