import { Task, UsersData } from "../mosks";

export const saveTaskToLocalStorage = (newTask: Task, username: string) => {
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
    const userData: UsersData = JSON.parse(userDataString);
    const currentUser = userData.users.find((userData) => userData.username === username);

    if (currentUser) {
      currentUser.tasks.push(newTask);
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }
};
