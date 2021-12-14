import { firestore } from "../Firebase/FirebaseConfiguration";
export const loginAdmin = async (email, pass) => {
  const dbRef = await firestore.collection("Admin").get();
  const data = dbRef.docs[0].data();

  if (data.email === email && data.password === pass) {
    localStorage.setItem("election-admin", true);
    return true;
  } else {
    alert("Invalid Credentials");
    return false;
  }
};
