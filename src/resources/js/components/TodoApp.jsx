import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

function RenderRows(props){
    return props.todos.map(todo => {
        return (
            <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td><button className="btn btn-secondary" onClick={() => props.deleteTask(todo)}>完了</button></td>
            </tr>
        );
    });
}

export default class TodoApp extends Component {

    constructor(){
        super();
        this.state = {
            todos: [],
            todo: ''
        }
        this.inputChange = this.inputChange.bind(this);
        this.addTodo = this.addTodo.bind(this);
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
        axios.post('/api/complete', {
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
                    <input type="text" className="form-control" name="todo" value={this.state.todo} onChange={this.inputChange}/>
                    <button className="btn btn-primary" onClick={this.addTodo}>登録</button>
                </div>

                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>タスク</th>
                            <th>完了</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <RenderRows
                            todos={this.state.todos}
                            deleteTask={this.deleteTask}
                        />
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('todoApp'));