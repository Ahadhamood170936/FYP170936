import { firestore } from "./FirebaseConfiguration";
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

export const createTeacher = async (data) => {
  const ref = await firestore.collection("teachers").doc();

  await ref.set({
    ...data,
    uid: ref.id,
  });
};

export const deleteTeacher = async (id) => {
  await firestore.collection("teachers").doc(id).delete();
};

export const getTeachers = async () => {
  const ref = await firestore.collection("teachers").get();
  const teachers = [];
  ref.docs.forEach((item) => {
    teachers.push(item.data());
  });
  return teachers;
};

export const createClassFourWorker = async (data) => {
  const ref = await firestore.collection("classfourworkers").doc();

  await ref.set({
    ...data,
    uid: ref.id,
  });
};

export const deleteclassfourworkers = async (id) => {
  await firestore.collection("classfourworkers").doc(id).delete();
};

export const getclassfourworkers = async () => {
  const ref = await firestore.collection("classfourworkers").get();
  const classfourworkers = [];
  ref.docs.forEach((item) => {
    classfourworkers.push(item.data());
  });
  return classfourworkers;
};

export const createStudent = async (data) => {
  const ref = await firestore.collection("students").doc();

  await ref.set({
    ...data,
    uid: ref.id,
  });
};

export const deleteStudent = async (id) => {
  await firestore.collection("students").doc(id).delete();
};

export const getStudents = async () => {
  const ref = await firestore.collection("students").get();
  const students = [];
  ref.docs.forEach((item) => {
    students.push(item.data());
  });
  return students;
};
