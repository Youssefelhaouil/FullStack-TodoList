export const storageKey = "userData";
const userDataString = localStorage.getItem(storageKey);
export const userDatas = userDataString ? JSON.parse(userDataString) : null;
