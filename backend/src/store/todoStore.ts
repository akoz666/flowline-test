export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface CreateTodoInput {
  title: string;
}

export interface UpdateTodoInput {
  title?: string;
  completed?: boolean;
}

let todos: Todo[] = [];
let nextId = 1;

export function resetTodos(): void {
  todos = [];
  nextId = 1;
}

export function listTodos(): Todo[] {
  return todos;
}

export function getTodo(id: string): Todo | undefined {
  return todos.find((todo) => todo.id === id);
}

export function createTodo(input: CreateTodoInput): Todo {
  const todo: Todo = {
    id: String(nextId++),
    title: input.title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);
  return todo;
}

export function updateTodo(id: string, input: UpdateTodoInput): Todo | undefined {
  const todo = getTodo(id);
  if (!todo) {
    return undefined;
  }
  if (input.title !== undefined) {
    todo.title = input.title;
  }
  if (input.completed !== undefined) {
    todo.completed = input.completed;
  }
  return todo;
}

export function deleteTodo(id: string): boolean {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    return false;
  }
  todos.splice(index, 1);
  return true;
}
