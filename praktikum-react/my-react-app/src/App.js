import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import Counter from './Counter';
import Greeting from './Greeting';

function Example() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="Nama" value={name} onChange={handleNameChange} />
      <input type="number" placeholder="Umur" value={age} onChange={handleAgeChange} />
      <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
      <p>{name} berumur {age} tahun dan emailnya adalah {email}.</p>
    </div>
  );
}

// Komponen untuk menampilkan satu tugas
function TodoItem({ task, onDelete }) {
  return (
    <li className="flex justify-between items-center p-2 bg-gray-100 rounded-lg shadow-sm mb-2">
      <span>{task}</span>
      <button
        onClick={onDelete}
        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
      >
        Hapus
      </button>
    </li>
  );
}

// Komponen utama TodoList
function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Menambahkan tugas baru ke daftar
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  // Menghapus tugas dari daftar
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Todo List</h2>
      <form onSubmit={handleAddTask} className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Tambahkan tugas..."
          className="flex-1 p-2 border rounded-l-lg"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
        >
          Tambah
        </button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <TodoItem key={index} task={task} onDelete={() => handleDeleteTask(index)} />
        ))}
      </ul>
    </div>
  );
}


// Komponen Header
function Header() {
  return (
    <header>
      <h1>Aplikasi React Saya</h1>
    </header>
  );
}

// Komponen Main
function Main() {
  return (
    <main>
      <h2>Selamat datang di Aplikasi React Saya!</h2>
      <p>Ini adalah area konten utama.</p>
    </main>
  );
}

// Komponen Footer
function Footer() {
  return (
    <footer>
      <p>&copy; 2023 Aplikasi React Saya</p>
    </footer>
  );
}



function App() {
  return (
    <div>
      <Header />
      <Main />
      <Greeting name="John" />
      <Counter />
      <Example />
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <TodoList />
    </div>  
      <Footer />
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
