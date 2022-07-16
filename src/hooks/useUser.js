import { useContext } from "react";
import { getSigner } from "../helpers/utils";
import { UserContext } from "../UserProvider";

export const useUser = () => {
  const [authedUser, setAuthedUser] = useContext(UserContext);

  const setUser = async () => {
    const signerAddr = await getSigner().getAddress();
    const signerBal = await getSigner().getBalance();
    setAuthedUser({
      userAddr: signerAddr,
      userBal: Number(signerBal),
      isAuthed: true,
    });
  };
  return { setUser };
};
