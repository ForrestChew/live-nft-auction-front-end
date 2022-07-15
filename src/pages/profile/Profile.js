import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { UserContext } from "../../UserProvider";
import { getUserBalInContract } from "../../helpers/contract-interactions/read-functions";
import { withdrawFunds } from "../../helpers/contract-interactions/write-functions";
import "./Profile.css";

const Profile = () => {
  const [userContractBal, setUserContractBal] = useState(0);
  const [authedUser] = useContext(UserContext);

  useEffect(() => {
    setsUserContractBalance();
  }, [authedUser, withdrawFunds]);

  const setsUserContractBalance = async () => {
    try {
      if (authedUser.isAuthed)
        setUserContractBal(
          ethers.utils.formatEther(
            await getUserBalInContract(authedUser.userAddr)
          )
        );
    } catch (e) {
      console.log(e);
    }
  };

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
