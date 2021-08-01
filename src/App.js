import { useState } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Header from './Components/Header'
import Footer from './Components/Footer'

import Main from './Pages/Main'
import AddTask from './Components/AddTask'
import About from './Pages/About'

function App() {
  const [tasks, setTasks] = useState([])
  const [showAddTask, setShowAddTask] = useState(false)

  // Add Task
  function addTask(task) {
    // console.log('About to add task: ', task)
    // const id = Math.floor(Math.random() * 10000) + 1

    // Part 1 - prior to have json-server running
    // const id =
    //   Math.max.apply(
    //     Math,
    //     tasks.map((task) => {
    //       return task.id
    //     })
    //   ) + 1
    // // console.log('Max id: ', id)
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])

    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setTasks([...tasks, data])
        // Note: likely want to make use of isPending and error states/variables
        //        We could/should also put the POST fetch into a custom hook, too
        // But just awaiting the results of the async fetch (promise) function
        //  is fine for this exercise

        // console.log('Added data: ', data)
        // console.log('All Tasks now: ', tasks)
      })

    setShowAddTask(false)
  }

  return (
    <Router>
      <div className='container'>
        <Header
          showAdd={showAddTask}
          onAdd={() => setShowAddTask(!showAddTask)}
        />
        <Route path='/' exact>
          {!showAddTask && (
            <Main tasks={tasks} setTasks={setTasks} />
          )}
        </Route>
        {showAddTask && <AddTask onAdd={addTask} />}
        <Route path='/about'>
          <About />
        </Route>
        <Footer />
      </div>
    </Router>
  )
}

export default App
