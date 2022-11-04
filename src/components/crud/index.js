import React from "react";
import StartFirebase from "../firebaseConfig/index";
import { ref, set, get, update, remove, child } from "firebase/database";

export class Crud extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            db: '',
            email: '',
            password: '',
            taskId: 0,
            tasks: ''
        }
        this.interface = this.interface.bind(this);
    }

   componentDidMount(){
    this.setState({
        db: StartFirebase
    });
   }

   render() {
    return(
        <>
        <label> Enter your email </label>
        <input type='text' id="emailbox" value={this.state.email}
        onChange={e =>{this.setState({email: e.target.value});}}
        /><br></br>

        <label> Enter your password </label>
        <input type='text' id="passwordbox" value={this.state.password}
        onChange={e =>{this.setState({password: e.target.value});}}
        /><br></br>

        <label> Your Task Array ID is: </label>
        <p>{this.state.taskId}</p>
        <button onClick={() => this.setState({ taskId: this.state.taskId + 1 })}>
          Click me
        </button>
        <br></br>
        
        <label> Enter your tasks separated by '|' </label>
        <input type='text' id="tasksbox" value={this.state.tasks}
        onChange={e =>{this.setState({tasks: e.target.value});}}
        /><br></br>

        <button id="createButton" onClick={this.interface}>Add Information</button>
        <button id="updateButton" onClick={this.interface}>Update Information</button>
        <button id="deleteButton" onClick={this.interface}>Delete Information</button>
        <button id="readButton" onClick={this.interface}>Retrieve DB Information</button>
        </>
    )
   }
   interface(event){
    const id = event.target.id;

    if(id==='createButton') {
        this.createData();
    }
    else if(id==='updateButton') {
        this.updateData();
    }
    if(id==='deleteButton') {
        this.deleteData();
    }
    if(id==='readButton') {
        this.readData();
    }
   }

   readAll() {
    return {
        email: this.state.email,
        password: this.state.password,
        taskId: this.state.taskId,
        tasks: this.state.tasks
    }
   }

   updateData() {
    const db = this.state.db;
    const data = this.readAll();

    update(ref(db, 'Users/'+data.email),
    {
        Password: data.password,
        TasksList: data.tasks
    })

    update(ref(db, 'Tasks/'+data.taskId),
    {
        TasksList: data.tasks,
        UserEmail: data.email
    })
    .then(()=>{alert('Data updated in the database.')})
    .catch((error)=>{alert('Data NOT updated, because of this error:'+error)})
   }

   createData() {
    const db = this.state.db;
    const data = this.readAll();

    set(ref(db, 'Users/'+data.email),
    {
        Password: data.password,
        TasksList: data.tasks
    })

    set(ref(db, 'Tasks/'+data.taskId),
    {
        TasksList: data.tasks,
        UserEmail: data.email
    })
    .then(()=>{alert('Data created in the database.')})
    .catch((error)=>{alert('Data NOT created, because of this error:'+error)})
   }

   updateData() {
    const db = this.state.db;
    const data = this.readAll();

    update(ref(db, 'Users/'+data.email),
    {
        Password: data.password,
        TasksList: data.tasks
    })

    update(ref(db, 'Tasks/'+data.taskId),
    {
        TasksList: data.tasks,
        UserEmail: data.email
    })
    .then(()=>{alert('Data updated in the database.')})
    .catch((error)=>{alert('Data NOT updated, because of this error:'+error)})
   }

   deleteData() {
    const db = this.state.db;
    const email = this.getAllInputs().email;
    const taskId = this.getAllInputs().taskId;

    remove(ref(db, 'Users/'+email))
    remove(ref(db, 'Tasks/'+taskId))
    .then(()=>{alert('Data was deleted.')})
    .catch((error)=>{alert('Data NOT deleted, because of this error:'+error)})
   }

   readData() {
    const dbref = ref(this.state.db);
    const email = this.getAllInputs().email;
    const taskId = this.getAllInputs().taskId;

    get(child(dbref, 'Users/'+email)).then((snapshot) => {
        if(snapshot.exists()) {
            this.setState({
                email: snapshot.val().Email,
                password: snapshot.val().Password,
                tasks: snapshot.val().TasksList
            })
        }
        else {
            alert("no snapshot available");
        }
    })

    get(child(dbref, 'Tasks/'+taskId)).then((snapshot) => {
        if(snapshot.exists()) {
            this.setState({
                taskId: snapshot.val().taskId,
                email: snapshot.val().UserEmail,
                tasks: snapshot.val().TasksList
            })
        }
        else {
            alert("no snapshot available");
        }
    })
    .catch((error)=>{alert("There was an error:"+error)});
   }
}
