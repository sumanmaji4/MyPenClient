import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface CompilerSliceStateType {
  fullCode: {
    html: string
    css: string
    javascript: string
  }
  currentLanguage: 'html' | 'css' | 'javascript'
}

const initialState: CompilerSliceStateType = {
  fullCode: {
    html: `
<body>
  <div class="container">
    <h1>Todo List</h1>
    <input type="text" id="taskInput" placeholder="Add new task">
    <button id="addTaskBtn">Add Task</button>
    <ul id="taskList"></ul>
  </div>
</body>`,
    css: `
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100vw;
}

.container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
}

h1 {
  text-align: center;
}

input[type="text"] {
  width: 70%;
  padding: 8px;
  margin-bottom: 10px;
}

button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}

.completed {
  text-decoration: line-through;
  color: #888;
}`,
    javascript: `
document.addEventListener("DOMContentLoaded", function() {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  addTaskBtn.addEventListener("click", function() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const li = document.createElement("li");
      li.innerText = taskText;
      taskList.appendChild(li);
      taskInput.value = "";

      li.addEventListener("click", function() {
        li.classList.toggle("completed");
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.addEventListener("click", function() {
        taskList.removeChild(li);
      });

      li.appendChild(deleteBtn);
    }
  });
});`,
  },
  currentLanguage: 'html',
}

const compilerSlice = createSlice({
  name: 'compilerSlice',
  initialState,
  reducers: {
    updateCurrentLanguage: (
      state,
      action: PayloadAction<CompilerSliceStateType['currentLanguage']>
    ) => {
      state.currentLanguage = action.payload
    },

    updateCodeValue: (state, action: PayloadAction<string>) => {
      state.fullCode[state.currentLanguage] = action.payload
    },

    updateFullCode: (
      state,
      action: PayloadAction<CompilerSliceStateType['fullCode']>
    ) => {
      state.fullCode = action.payload
    },
  },
})

export default compilerSlice.reducer
export const { updateCurrentLanguage, updateCodeValue, updateFullCode } =
  compilerSlice.actions
