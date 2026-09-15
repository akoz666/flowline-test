export interface User {
  id: string;
  username: string;
  password: string;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export function createInitialUsers(): User[] {
  return [{ id: "1", username: "admin", password: "admin" }];
}

export function createInitialTodos(): Todo[] {
  return [
    { id: "1", title: "Buy groceries", completed: false },
    { id: "2", title: "Write report", completed: false },
  ];
}

export const users: User[] = createInitialUsers();
export const todos: Todo[] = createInitialTodos();

export function resetSeedData(): void {
  users.splice(0, users.length, ...createInitialUsers());
  todos.splice(0, todos.length, ...createInitialTodos());
}
