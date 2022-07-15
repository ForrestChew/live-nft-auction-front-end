import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import {
  getProvider,
  getSigner,
} from "../../helpers/contract-interactions/utils";
import { UserContext } from "../../UserProvider";
import "./CryptoLogin.css";

const CryptoLogin = () => {
  const [authedUser, setAuthedUser] = useContext(UserContext);
  const [shortenedAddr, setShortenedAddr] = useState("");
  const [shortenedBal, setShortenedBal] = useState("");
  const [balanceDisplay, setBalanceDisplay] = useState(0);

  useEffect(() => {
    if (authedUser.isAuthed) {
      const userBalIsolate = ethers.utils.formatEther(
        authedUser.userBal.toString()
      );
      const shortenedUserBal = userBalIsolate.substring(0, 6);
      setShortenedBal(shortenedUserBal);
    } else {
      setShortenedBal("");
    }
  }, [authedUser]);

  useEffect(() => {
    if (authedUser.isAuthed) {
      document.getElementById("login-btn").disabled = true;
      const addressBegining = authedUser.userAddr.substring(0, 4);
      const addressEnd = authedUser.userAddr.substring(37, 42);
      setShortenedAddr(
        addressBegining.concat(".".padEnd(6, ".")).concat(addressEnd)
      );
    } else {
      document.getElementById("login-btn").disabled = false;
    }
  }, [authedUser]);

  const updateUser = async () => {
    const signerAddr = await getSigner().getAddress();
    const signerBal = await getSigner().getBalance();
    setAuthedUser({
      userAddr: signerAddr,
      userBal: Number(signerBal),
      isAuthed: true,
    });
  };

  const login = async () => {
    document.getElementById("login-btn").disabled = true;
    await getProvider()
      .send("eth_requestAccounts", [])
      .then(() => {
        updateUser();
      });
    document.getElementById("login-btn").disabled = false;
  };

  window.ethereum.on("accountsChanged", () => {
    setAuthedUser(updateUser());
  });

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
