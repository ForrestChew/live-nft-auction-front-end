import { useState, useEffect, useContext } from "react";
import { useMoralis } from "react-moralis";
import { UserContext } from "../../UserProvider";
import { useContractInteractions } from "../../hooks/useContractInteractions";
import "./Profile.css";

const Profile = () => {
  const [userContractBal, setUserContractBal] = useState(0);
  const [authedUser] = useContext(UserContext);
  const { withdrawFunds, getUserContractBalance } = useContractInteractions();

  const { Moralis } = useMoralis();

  useEffect(() => {
    setsUserContractBalance();
  }, [authedUser]);

  // Sets the balance that the authed user has in auction smart contract.
  const setsUserContractBalance = async () => {
    try {
      if (authedUser.isAuthed)
        setUserContractBal(
          Number(
            Moralis.Units.FromWei(
              await getUserContractBalance(authedUser.userAddr)
            )
          )
        );
    } catch (e) {
      console.log(e);
    }
  };

  // Calls withdral function on smart contract and resets the balance on successfull withdrawl.
  const widthdraw = () => {
    if (authedUser.isAuthed) {
      withdrawFunds().then(() => {
        setsUserContractBalance();
      });
    } else {
      alert("Please Login");
    }
  };

  return (
    <div className="outer">
      <div className="balance-box">
        <p>User Address: {authedUser.userAddr}</p>
        <p>Balance: {userContractBal} Matic</p>
        <button className="btn" onClick={widthdraw}>
          WITHDRAW
        </button>
      </div>
    </div>
  );
};

export default Profile;
