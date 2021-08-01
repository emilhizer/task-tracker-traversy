import { useState } from 'react'

function AddTask({ onAdd }) {
  const [text, setText] = useState('')
  const [daytime, setDayTime] = useState('')
  const [reminder, setReminder] = useState(false)

  function onSubmit(e) {
    e.preventDefault()

    if (!text) {
      alert('Please add a task')
      return
    }

    onAdd({ text, day: daytime, reminder })

    setText('')
    setDayTime('')
    setReminder(false)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Task</label>
        <input
          type='text'
          placeholder='Add task'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Day & Time</label>
        <input
          type='text'
          placeholder='Add day and time'
          value={daytime}
          onChange={(e) => setDayTime(e.target.value)}
        />
      </div>
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e) =>
            setReminder(e.currentTarget.checked)
          }
        />
      </div>

      <input
        className='btn btn-block'
        type='submit'
        value='Save'
      />
    </form>
  )
}

export default AddTask
