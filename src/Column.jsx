import React, { Component } from 'react';
import {Task} from "./Task";
import _ from 'lodash';

export class Column extends Component {
	constructor(props) {
		super(props);

		this.state = {
			taskList: JSON.parse(localStorage.getItem(this.props.headerName)) || [],
			colName: props.headerName

		}
	}

	updateState(newList) {
		localStorage.setItem(this.props.headerName, JSON.stringify(newList));

		this.setState({
			taskList: newList
		})
	}

	addTask(obj) {
		var newList = Object.assign(this.state.taskList);
		var text = obj.text || "new task";

		newList.push({
			id:newList.length,
			text: text
		})

		this.updateState(newList);
	}

	allowDrop(e) {
	    e.preventDefault();
	}

	format(str) {
		return str.toLocaleLowerCase().replace(/\s/g,'');
	}

	handleOverDrop(e) {
		e.preventDefault(); 
		if (e.type != "drop") {
			return; 
		}
		
		var draggedEl = window.dragEle;
		var taskObj = {};

		if (draggedEl) {
			var idInfo = draggedEl.id.split("_");
			taskObj.id = idInfo[1];
			taskObj.colName = idInfo[0];
			taskObj.text = draggedEl.firstChild.textContent
		}
		

		if (taskObj.colName && this.format(this.state.colName) !== taskObj.colName) {
			this.addTask(taskObj);
			var e = new Event("removeTask");

			e.info = {
				id: taskObj.id,
				colName: taskObj.colName
			}

			window.dispatchEvent(e);
		}


	}

	removeChild(e) {
		var id = e.target.parentElement.id.split("_")[1];

		_.remove(this.state.taskList, function(task) {
			return (task.id == id);
		});
		console.log(this.state.taskList.length);
		var newTaskList = Object.assign(this.state.taskList);
		
		this.updateState(newTaskList);
	}

	removeTask(e) {
		if(e.info.colName === this.format(this.state.colName)){
			console.log(this.state.taskList.length);
			_.remove(this.state.taskList, function(task) {
				return (task.id == e.info.id);
			});
			console.log(this.state.taskList.length);
			var newTaskList = Object.assign(this.state.taskList);
			this.updateState(newTaskList);
		}
	}

	taskComponent(taskList) {
		var prefix = this.format(this.props.headerName);
		return taskList.map((taskObj)=>(
			<Task id={prefix + "_"+taskObj.id} text={taskObj.text} key={taskObj.id} close={this.removeChild.bind(this)}/>
		));
	}

	render() {
		const taskCompList = this.taskComponent(this.state.taskList);
		window.addEventListener('removeTask', this.removeTask.bind(this));
		return (
			<div className="column-wrapper" onDrop={this.handleOverDrop.bind(this)} onDragOver={this.handleOverDrop.bind(this)}>
				<header>{this.props.headerName}</header>
				<div className="task-container">
					{taskCompList}
				</div>
				<button onClick={this.addTask.bind(this)}>Add Task</button>
			</div>
		)
	}
}



