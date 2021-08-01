import { useEffect } from 'react'

import Tasks from '../Components/Tasks'

import useFetch from '../Hooks/useFetch'

function Main({ tasks, setTasks }) {
  // Fetch data
  const { data, isPending, error } = useFetch(
    'http://localhost:5000/tasks'
  )

  function saveData(data) {
    setTasks(data)
  }

  // Update Tasks when data fetch completes
  useEffect(() => {
    // console.log('Data retrieved: ', data)
    saveData(data)
    // console.log('Tasks data populated: ', tasks)
  }, [data])

  // Delete Task
  function deleteTask(id) {
    // console.log('Delete: ', id)
    fetch('http://localhost:5000/tasks/' + id, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  function toggleReminder(id) {
    // console.log('Toggle: ', id)
    const task = tasks.filter((task) => task.id === id)[0]
    const toggledTask = {
      ...task,
      reminder: !task.reminder
    }

    fetch('http://localhost:5000/tasks/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toggledTask)
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        // Could setTasks after API finishes, but this seems like poor UX
        // Maybe could just confirm that data retrieved is identical to what
        //  user thought it should be in case other user updated this task, too
        // setTasks(
        //   tasks.map((task) =>
        //     task.id === id
        //       ? { ...task, reminder: !task.reminder }
        //       : task
        //   )
        // )
        // Note: likely want to make use of isPending and error states/variables
        //        We could/should also put the POST fetch into a custom hook, too
        // But just awaiting the results of the async fetch (promise) function
        //  is fine for this exercise
      })

    setTasks(
      tasks.map((task) =>
        task.id === id ? toggledTask : task
      )
    )
  }

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {isPending && <div>Loading...</div>}

      {tasks && tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleReminder}
        />
      ) : !(isPending || error) ? (
        'No tasks... please add one.'
      ) : (
        ''
      )}
    </div>
  )
}

export default Main
