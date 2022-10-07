import React, { useState, useEffect } from "react";
import Button from "../button";
import Pagination from "./pagination";
import classes from "./style.module.css";
import "./pagination.css";
import {FaArrowUp, FaArrowDown} from "react-icons/fa";

const url = "https://jsonplaceholder.typicode.com/todos";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);
  const [sorted, setSorted] = useState({ sorted: "id", reversed:false});

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((todos) => {
        setTodos(todos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderArrow = () => {
    if(sorted.reversed){
      return <FaArrowUp></FaArrowUp>
    }
    return <FaArrowDown></FaArrowDown>
  }

  const renderThead = () => {
    return (
      <thead>
        <tr>
          <th onClick={sortById}>id
          {sorted.sorted === "id" ? renderArrow() : null}
          </th>
          <th>başlık</th>
          <th>durum</th>
          <th>Aksiyon</th>
        </tr>
      </thead>
    );
  };

  const remove = (todo) => {
    if (window.confirm("Silmek üzerisiniz emin misiniz")) {
      setTodos((prev) => {
        return prev.filter((x) => x.id != todo.id);
      });
    }
  };

  const edit = (todo) => {
    setSelectedTodo(todo);
  };

const lastPostIndex = currentPage * postsPerPage;
const firstPostIndex = lastPostIndex - postsPerPage;

const sortById = () => {
  setSorted({ sorted: "id", reversed: !sorted.reversed });
  const todoCopy = [...todos];
  todoCopy.sort((todoA, todoB) =>{
    if(sorted.reversed){
      return todoA.id - todoB.id;
    }
    return todoB.id - todoA.id;
  });
  setTodos(todoCopy);
}

  const renderBody = () => {
    return (
      <tbody>
        {todos.slice(firstPostIndex,lastPostIndex).map((todo, index) => {
          return (
            <tr key={index}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? "Tamamlandı" : "Yapılacak"}</td>
              <td>
                <Button
                  className={`btn btn-sm btn-danger ${classes.actionButton} `}
                  onClick={() => remove(todo)}
                >
                  Sil
                </Button>
                <Button
                  onClick={() => edit(todo)}
                  className="btn btn-sm btn-warning"
                >
                  Düzenle
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  const renderEditForm = () => {
    return (
      <div>
        <input type={"text"} />
        <inpu type="check" />
        <Button>Kaydet</Button>
        <Button onClick={() => setSelectedTodo(undefined)}>Vazgeç</Button>
      </div>
    );
  };

  return (
    <div className={`${classes.container} container`}>
      {selectedTodo && renderEditForm()}
      <table className="table">
        {renderThead()}
        {renderBody()}
      </table>
	  <Pagination totalPosts={todos.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}></Pagination>
    </div>
  );
};

export default TodoList;
