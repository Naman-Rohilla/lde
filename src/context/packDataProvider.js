import { get, getDatabase, ref } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import app from "../firebaseConfig";

const PackContext = createContext();

export const PackDataProvider = ({ children }) => {
  const [packArray, setPackArray] = useState([]);

  async function fetchPack() {
    const db = getDatabase(app);
    const dbRef = ref(db, "lde/packaging");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const packData = Object.freeze(Object.values(snapshot.val()));
      console.log(packData, "pack");
      setPackArray(packData);
    } else {
      setPackArray([]);
    }
  }

  useEffect(() => {
    fetchPack();
  }, []);

  return (
    <>
      <PackContext.Provider value={{ packArray, fetchPack }}>
        {children}
      </PackContext.Provider>
    </>
  );
};

export const usePackData = () => useContext(PackContext);
