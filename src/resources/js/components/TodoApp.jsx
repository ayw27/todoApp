import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

function RenderRows(props){
    return props.todos.map(todo => {
        return (
            <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td><button className="btn btn-secondary">完了</button></td>
            </tr>
        );
    });
}

export default class TodoApp extends Component {

    constructor(){
        super();
        this.state = {
            todos: []
        }
    }

    //一覧情報を取得しセット
    componentDidMount(){
        axios.get('/api/get')
            .then(res => {
                console.log('通信成功');
                const data = res.data;
                console.log(data);
                /*
                this.setState({
                    todos: res.data
                });
                */
            })
            .catch((e) => {
                console.log(e + ':通信に失敗しました');
            });
    }

    render(){
        return (
            <React.Fragment>
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>タスク</th>
                            <th>完了</th>
                        </tr>
                    </thead>
                    <tbody>
                        <RenderRows
                            todos={this.state.todos}
                        />
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('todoApp'));