const URL_API ="https://63aa9cf2fdc006ba6046fb58.mockapi.io/task"
import TaskList from "./Todo";

async function getTaskApi() {
    try {
      const response = await fetch(URL_API);
      const dataApi = await response.json();
      return dataApi
    } catch (error) {
      console.log("Fetch error", error);
    }
  }

async function addTask(params: TaskList ) {
    try {
        const response = await fetch(URL_API, {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        const dataNew = await response.json();
        console.log(dataNew);
        
      } catch (error) {
        console.log("Fetch error", error);
      }
}

async function deleteTask(params:number) {
    
}

export {
    getTaskApi,
    addTask
}