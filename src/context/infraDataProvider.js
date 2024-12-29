import { createContext, useContext, useEffect, useState } from "react";
import app from "../firebaseConfig";
import { get, getDatabase, ref } from "firebase/database";

const InfraContext = createContext();

export const InfraDataProvider = ({ children }) => {
  const [infraArray, setInfraArray] = useState([]);

  const fetchInfra = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "lde/infrastructure");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const infraData = Object.freeze(Object.values(snapshot.val()));
      console.log(infraData, "infra");
      setInfraArray(infraData);
    } else {
      setInfraArray([]);
    }
  };
  useEffect(() => {
    fetchInfra();
  }, []);

  return (
    <>
      <InfraContext.Provider value={{ infraArray, fetchInfra }}>
        {children}
      </InfraContext.Provider>
    </>
  );
};

export const useInfraData = () => useContext(InfraContext);
