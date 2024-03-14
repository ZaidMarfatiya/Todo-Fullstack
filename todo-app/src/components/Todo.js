import { useState, useEffect } from 'react'
import { useAxios } from '../utils/useAxios'
import Swal from 'sweetalert2'

const Todo = () => {
    const baseUrl = "http://127.0.0.1:8000/api"
    const api = useAxios()

    const [todo, setTodo] = useState([])
    const [filteredTodos, setFilteredTodos] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filterCompleted, setFilterCompleted] = useState(false)

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
        await api.get(`${baseUrl}/todos/`).then((res) => {
            setTodo(res.data)
            setFilteredTodos(res.data)
        })
    }

    const [createTodo, setCreateTodo] = useState(
        { title: "", completed: "", due_date: "", reminder: "" }
    )
    const handleTodoInput = event => {
        setCreateTodo({
            ...createTodo,
            [event.target.name]: event.target.value
        })
    }

    const formSubmit = () => {
        const formdata = new FormData()

        formdata.append("title", createTodo.title)
        formdata.append("completed", false)
        formdata.append("due_date", createTodo.due_date)
        formdata.append("reminder", createTodo.reminder)

        try {
            api.post(`${baseUrl}/todos/`, formdata).then(() => {
                Swal.fire({
                    title: "Todo Added",
                    icon: "success",
                    toast: true,
                    timer: 2000,
                    position: "top-right",
                    timerProgressBar: true,
                })
                fetchTodos()
                setCreateTodo({ title: "", completed: "", due_date: "", reminder: "" })
            })
        } catch (error) { }
    }

    const deleteTodo = async (todo_id) => {
        await api.delete(`${baseUrl}/todos/${todo_id}/`)
        Swal.fire({
            title: "Todo Deleted",
            icon: "success",
            toast: true,
            timer: 2000,
            position: "top-right",
            timerProgressBar: true,
        })
        fetchTodos()
    }

    const markTodoAsComplete = async (todo_id) => {
        const formdata = new FormData()

        formdata.append("completed", true)

        await api.patch(`${baseUrl}/todos/${todo_id}/`, formdata)
        Swal.fire({
            title: "Todo Completed",
            icon: "success",
            toast: true,
            timer: 2000,
            position: "top-right",
            timerProgressBar: true,
        })
        fetchTodos()
    }

    const unmarkTodoAsIncomplete = async (todo_id) => {
        const formdata = new FormData()

        formdata.append("completed", false)

        await api.patch(`${baseUrl}/todos/${todo_id}/`, formdata)
        Swal.fire({
            title: "Todo Incompleted",
            icon: "error",
            toast: true,
            timer: 2000,
            position: "top-right",
            timerProgressBar: true,
        })
        fetchTodos()
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        const searchedTodos = todo.filter(todo =>
            todo.title.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setFilteredTodos(searchedTodos)
    }

    const handleFilterCompleted = () => {
        setFilterCompleted(!filterCompleted)
        const filteredTodos = todo.filter(
            todo => todo.completed.toString() === filterCompleted.toString()
        )
        setFilteredTodos(filteredTodos)
    }

    return (
        <>
            <div className="container" style={{ marginTop: "150px", padding: "10px" }}>
                <div className="row justify-content-center align-items-center main-row">
                    <div className="col shadow main-col bg-white">
                        <div className="row bg-primary text-white">
                            <div className="col p-2">
                                <h4>Todo List</h4>
                            </div>
                        </div>
                        <div className="row justify-content-between text-white p-2">
                            <div className="form-group flex-fill mb-2">
                                <input
                                    id="todo-input"
                                    name="title"
                                    onChange={handleTodoInput}
                                    value={createTodo.title}
                                    type="text"
                                    className="form-control"
                                    placeholder="Write a todo..."
                                />
                            </div>
                            <div className="form-group flex-fill mb-2">
                                <input
                                    id="due-date-input"
                                    name='due_date'
                                    onChange={handleTodoInput}
                                    value={createTodo.due_date}
                                    type="datetime-local"
                                    className="form-control"
                                    placeholder="Due Date"
                                />
                            </div>
                            <div className="form-group flex-fill mb-2">
                                <input
                                    id="reminder-input"
                                    name="reminder"
                                    onChange={handleTodoInput}
                                    value={createTodo.reminder}
                                    type="datetime-local"
                                    className="form-control"
                                    placeholder="Reminder"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={formSubmit}
                                className="btn btn-primary mb-2 ml-2"
                            >
                                Add todo
                            </button>
                        </div>
                        <div className="row justify-content-between align-items-center p-2">
                            <div className="form-group flex-fill mb-2">
                                <input
                                    id="search-input"
                                    onChange={handleSearch}
                                    value={searchTerm}
                                    type="text"
                                    className="form-control"
                                    placeholder='Search todos...'
                                />
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="filterCompleted"
                                    onChange={handleFilterCompleted}
                                />
                                <label className="form-check-label" htmlFor="filterCompleted">
                                    Show Completed
                                </label>
                            </div>
                        </div>
                        <div className="row" id="todo-container">
                            {filteredTodos.map((todo) =>
                                <div key={todo.id} className="col col-12 p-2 todo-item">
                                    <div className="input-group">
                                        {todo.completed.toString() === "true" &&
                                            <p className="form-control"><strike>{todo.title}</strike></p>
                                        }
                                        {todo.completed.toString() === "false" &&
                                            <p className="form-control">{todo.title}</p>
                                        }
                                        <div className="input-group-append">
                                            <button
                                                className="btn bg-success text-white ml-2"
                                                type="button" id="button-addon2 "
                                                onClick={() => markTodoAsComplete(todo.id)}
                                            >
                                                <i className='fas fa-check' ></i>
                                            </button>
                                            <button
                                                className="btn bg-danger text-white ml-2"
                                                type="button"
                                                id="button-addon2 "
                                                onClick={() => unmarkTodoAsIncomplete(todo.id)}
                                            >
                                                <i className='fas fa-cancel' ></i>
                                            </button>
                                            <button
                                                className="btn bg-danger text-white me-2 ms-2 ml-2"
                                                type="button"
                                                id="button-addon2"
                                                onClick={() => deleteTodo(todo.id)}
                                            >
                                                <i className='fas fa-trash' ></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-6">
                                            <small>Due Date: {todo.due_date}</small>
                                        </div>
                                        <div className="col-6">
                                            <small>Reminder: {todo.reminder}</small>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo