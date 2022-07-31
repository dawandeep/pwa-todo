import axios from "axios";
import React, { useEffect, useState } from "react";
import './tasks.css';
const Tasks = () => {
  const [task, setTask] = useState([]);
  const [item, setItem] = useState("");
  const [isCompletd, SetIsCompleted] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/tasks").then((res) => setTask(res.data));
  },[]);

  const addTask = () => {
    axios
      .post("http://localhost:3001/tasks", {
        taskName: item,
        isCompletd: isCompletd,
      })
      .then((res)=>{
        console.log(res.data);
        setTask([...task,res.data])

      })
      .catch((err) => console.log(err));
  };
  
 const markCompleted = (id) => {
    let index = task.indexOf(task.filter(item => item.id === id)[0]);
    task[index].isCompletd = task[index].isCompletd ? false : true;
    let iscom =task[index].isCompletd
    let tskName=task[index].taskName
    SetIsCompleted(iscom);
    axios.put(`http://localhost:3001/tasks/${id}`,{"taskName":tskName,"isCompletd":iscom})
    .then((res)=>console.log(res.data))
    .catch((err)=> console.log(err))
    setTask([...task])
  }
const deleteTask =  (id)=>{
   axios.delete(`http://localhost:3001/tasks/${id}`)
  .then((res)=>{
    let data = task.filter(items => items.id !== id)
    // console.log(stor);
    setTask(data)
  })
  .catch((err)=>console.log(err))
}
return (
    <>
      <div className="container">
        <div className="row mt-4 d-flex justify-content-center">
          <div className="col-md-8">
          
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Task"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                required
                onChange={(e) => setItem(e.target.value)}
              />
              <button className="btn btn-secondary" onClick={addTask} id="button-addon2">ADD TODO</button>
              </div>
        
          </div>
         
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <ul className="list-group">
              {
                task.map((item) => (
              <li key={item.id} className="list-group-item">
                {
                  item.isCompletd ? (
                    
                  <input
                    type="checkbox"
                    checked
                    className="float-start largerCheckbox"
                    onChange={()=>markCompleted(item.id)}
                  />
                  ):(<input
                    type="checkbox"
                    checked=""
                    className="float-start largerCheckbox"
                    onChange={()=>markCompleted(item.id)}
                  />
                  )
                }  
                 {item.isCompletd ? (
                    <span key={item.id} className="text-decoration-line-through text-success fw-bold">
                      {item.taskName}<i className="fa-solid fa-xmark float-end" onClick={()=>deleteTask(item.id)}></i>
                    </span>
                  ) : (
                    <span key={item.id} className="text-danger fw-bold">{item.taskName}<i className="fa-solid fa-xmark float-end" onClick={()=>deleteTask(item.id)}></i></span>
                  )}
                </li>
              ))}
               
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
