const URL_API = "https://63aa9cf2fdc006ba6046fb58.mockapi.io/task"
import { Task } from "./Todo";


async function getTaskApi(): Promise<Task[]> {
  try {
    const response = await fetch(URL_API);
    const dataApi: Task[] = await response.json();
    return dataApi
  } catch (error) {
    console.log("Fetch error", error);
    return []
  }
}

async function addTask(params: Omit<Task, 'id'>) {
  try {
    await fetch(URL_API, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });
  } catch (error) {
    console.log("Fetch error", error);
  }
}

async function deleteTask(id: number) {
  try {
    await fetch(`${URL_API}/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.log("Delete error");
  }
}

async function checkTask(id: number, checked: boolean) {
  try {
    await fetch(`${URL_API}/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          isDone: checked
        }
      )
    })
  } catch (error) {
    console.log('check error', error);
  }
}

async function checkAllTasks(params: Task[]) {
  try {
    await fetch(URL_API, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })
  } catch (error) {
    console.log('check all error', error);

  }
}


async function searchTask(params: string): Promise<Task[]> {
  try {
    const response = await fetch(`${URL_API}?name=${params}`)
    if (response.ok) {
      const dataApi: Task[] = await response.json()
      return dataApi
    } else {
      console.log('search error', response.status);
      return []
    }
  } catch (error) {
    console.log('search error', error);
    return []
  }
}


export {
  getTaskApi,
  addTask,
  deleteTask,
  checkTask,
  checkAllTasks,
  searchTask
}