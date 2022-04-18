import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//RenderRowsの機能実装
function RenderRows(props){
    //mapでループしている（for相当）
    return props.todos.map(todo => {
        return (
            <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>
                    <button 
                        className="btn btn-secondary" 
                        onClick={() => props.deleteTask(todo)}
                    >
                        完了
                    </button>
                </td>
            </tr>
        );
    });
}

export default class TodoApp extends Component {

    //コンストラクタ内でstateにtodosを宣言
    constructor(){
        super();
        this.state = {
            todos: [],
            todo: ''
        };
        this.inputChange = this.inputChange.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    //コンポーネントがマウントされた時点で初期描画用のtodosをAPIから取得
    componentDidMount(){
        axios
            .get('/api/get')
            .then((res) => {
                //todosを更新（描画がかかる）
                this.setState({
                    todos: res.data
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

    //入力がされたら（都度）
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

    //登録ボタンがクリックされたら
    addTodo(){
        //空だと弾く
        if(this.state.todo == ''){
            return;
        }

        //入力値を投げる
        axios
            .post('/api/add', {
                title: this.state.todo
            })
            .then((res) => {
                //戻り値をtodosにセット
                this.setState({
                    todos: res.data,
                    todo: ''
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    //完了ボタンがクリックされたら
    deleteTask(todo){
        axios
            .post('/api/del', {
                id: todo.id
            })
           .then((res) => {
                this.setState({
                    todos: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    //テーブルの骨組みを描画し、行の描画はRenderRowsに任せる（その際、todosを渡す）
    render() {
        return (
            <React.Fragment>
                <div className="form-group mt-4">
                    <label htmlFor="todo">新規Todo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="todo" 
                        value={this.state.todo} 
                        onChange={this.inputChange}
                        placeholder="Todoを入力してください"
                    />
                </div>
                <button className="btn btn-primary" onClick={this.addTodo}>登録</button>
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>タスク</th>
                            <th>完了</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 行の描画 */}
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