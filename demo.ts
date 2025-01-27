import * as readlineSync from 'readline-sync';

type TaskID = number;
type TaskDescription = string;

enum TaskStatus {
  Pending = "Pending",
  Completed = "Completed",
  InProgress = "In Progress"
}

interface ToDo {
  id: TaskID;
  task: TaskDescription;
  completed: boolean;
  status: TaskStatus;
}

abstract class BaseTaskManager {
  abstract displayTodos(): void;
  abstract addTodo(task: TaskDescription): void;
}

class ToDoList extends BaseTaskManager {

  private todos: ToDo[] = [];

  public getTodos(): ToDo[] {
    return this.todos;
  }

  public setTodos(todos: ToDo[]): void {
    this.todos = todos;
  }

  public addTodo(task: TaskDescription): void {
    const newTodo: ToDo = {
      id: this.todos.length + 1, 
      task,
      completed: false,
      status: TaskStatus.Pending,
    };
    this.todos.push(newTodo);
  }

  public completeTodo(id: TaskID): void {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = true;
      todo.status = TaskStatus.Completed;
    }
  }

  public displayTodos(): void {
    this.todos.forEach(todo => {
      console.log(`${todo.id}. ${todo.task} - ${todo.status}`);
    });
  }

  public getPendingTodos(): ToDo[] {
    return this.todos.filter(todo => todo.status === TaskStatus.Pending);
  }

  public removeTodo(id: TaskID, removeAll: boolean = false): void {
    if (removeAll) {
      this.todos = [];
      console.log("All tasks have been removed.");
    } else {
      this.todos = this.todos.filter(todo => todo.id !== id);
    }
  }

  public async addTodoAsync(task: TaskDescription): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.addTodo(task);
        resolve();
      }, 1000);
    });
  }
}


async function runToDoApp() {
  const myTodoList = new ToDoList();

  while (true) {
    console.log("\n--- Todo List App ---");
    console.log("1. Add a task");
    console.log("2. Complete a task");
    console.log("3. Display all tasks");
    console.log("4. Display pending tasks");
    console.log("5. Remove a task");
    console.log("6. Remove all tasks");
    console.log("7. Exit");
    
    const action = readlineSync.question("Choose an action (1-7): ");
    
    switch (action) {
      case '1': {
        const task = readlineSync.question("Enter task description: ");
        await myTodoList.addTodoAsync(task);
        console.log("Task added!");
        break;
      }
      case '2': {
        const taskId = readlineSync.questionInt("Enter task ID to mark as completed: ");
        myTodoList.completeTodo(taskId);
        console.log("Task completed!");
        break;
      }
      case '3': {
        console.log("All tasks:");
        myTodoList.displayTodos();
        break;
      }
      case '4': {
        const pendingTodos = myTodoList.getPendingTodos();
        console.log("Pending tasks:");
        pendingTodos.forEach(todo => console.log(`${todo.id}. ${todo.task}`));
        break;
      }
      case '5': {
        const taskId = readlineSync.questionInt("Enter task ID to remove: ");
        myTodoList.removeTodo(taskId);
        console.log("Task removed!");
        break;
      }
      case '6': {
        myTodoList.removeTodo(0, true);
        console.log("All tasks removed!");
        break;
      }
      case '7': {
        console.log("Exiting the Todo List app...");
        return;
      }
      default:
        console.log("Invalid choice, please select a valid action.");
    }
  }
}

runToDoApp();