export interface Task {
  id: string;
  text: string;
  status: 'в\u00A0процессе' | 'выполнена';
}

export interface User {
  username: string;
  tasks: Task[];
}

export interface UsersData {
  users: User[];
}

export const initialData: UsersData = {
  users: [
    {
      username: 'Андрей',
      tasks: [
        { id: '1', text: 'Слетать на луну', status: 'в\u00A0процессе' },
        { id: '2', text: 'Купить сырники в Перекрестке', status: 'выполнена' },
      ],
    },
    {
      username: 'Анна',
      tasks: [
        { id: '3', text: 'Подать документы на визу', status: 'в\u00A0процессе' },
        { id: '4', text: 'Покормить кота', status: 'выполнена' },
        { id: '5', text: 'Покормить второго кота', status: 'выполнена' },
      ],
    },
  ],
};
