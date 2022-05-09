import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";

function RenderRows(props){
    return props.todos.map(todo => {

        //let isStatus = props.completeTask(todo.status)
        let isStatus = true

        console.log(isStatus)

        return (
            <tr key={todo.id}>
                <td>{todo.title}</td>
                {isStatus ? <td><Button variant="contained" onClick={() => props.completeTask(todo)}>COMPLETE</Button></td>
                 : <td><Button variant="contained" disabled onClick={() => props.completeTask(todo)}>COMPLETE</Button></td>}
                <td><Button variant="contained" onClick={() => props.returnTask(todo)}>RETURN</Button></td>
                <td><Button variant="outlined" onClick={() => props.deleteTask(todo)}>DELETE</Button></td>
            </tr>
        );
    });
}

export default class TodoApp extends Component {

    constructor(){
        super();
        this.state = {
            todos: [],
            todo: '',
            status: true
        }
        this.inputChange = this.inputChange.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.completeTask = this.completeTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    //初回表示 一覧情報を取得しセット
    componentDidMount(){
        axios.get('/api/get')
            .then(res => {
                console.log('通信成功');
                const data = res.data;
                console.log(data);
                this.setState({
                    todos: data
                });
            })
            .catch((e) => {
                console.log(e + ':通信に失敗しました');
            });
    }

    //入力
    inputChange(event){
        switch(event.target.name){
            case 'todo':
                this.setState({
                    todo: event.target.value
                });
                break;
            default:
                break;
        }
    }

    //登録ボタンクリック
    addTodo(){
        //空だったら
        if(this.state.todo == ''){
            return;
        }
        //入力値を通信
        axios.post('/api/add', {
                title: this.state.todo
            })
            .then((res) => {
                console.log('通信成功');
                const data = res.data;
                console.log(data);
                this.setState({
                    todos: data,
                    todo: ''
                });
            })
            .catch((e) => {
                console.log(e + ':通信に失敗しました');
            });
    }

    //完了ボタンクリック
    completeTask(todo){
        axios.post('/api/comp', {
            id: todo.id
        })
        .then((res) => {
            console.log('通信成功');
            const data = res.data;
            console.log(data);
            this.setState({
                status: data
            });
            console.log(this.state.status);
        })
        .catch((e) => {
            console.log(e + ':通信に失敗しました');
        });
    }

    //削除ボタンクリック
    deleteTask(todo){
        axios.post('/api/del', {
            id: todo.id
        })
        .then((res) => {
            console.log('通信成功');
            const data = res.data;
            console.log(data);
            this.setState({
                todos: data
            });
        })
        .catch((e) => {
            console.log(e + ':通信に失敗しました');
        });
    }

    render(){
        return (
            <React.Fragment>
                <div className="form-group mt-4">
                    <TextField fullWidth label="todo" id="todo" value={this.state.todo} onChange={this.inputChange} />
                    <Button variant="contained" onClick={this.addTodo}>SUBMIT</Button>
                </div>
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th>タスク</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <RenderRows
                            todos={this.state.todos}
                            completeTask={this.completeTask}
                            deleteTask={this.deleteTask}
                        />
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('todoApp'));