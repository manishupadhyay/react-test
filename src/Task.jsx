import React, { Component } from 'react';


export class Task extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: props.text || "add task info",
			display: false,
			id: props.id
		}
	}

	editClick(e) {
		this.setState({display: true});
	}

	closeTask() {

	}

	updateText(e) {
		this.setState({
			text: e.target.value
		});
	}

	dragStart(e) {
		window.dragEle = e.target;
	}

	dragEnd(e) {
		var xOffset = document.getElementById('root').getBoundingClientRect().x;		
		console.log(e.pageX - xOffset);
		console.log(e.clientX - xOffset);
	}

	save() {
		this.setState({display: false});
	}

	render() {
		return (
			<div id={this.state.id} className="task-wrapper" draggable="true" onDragStart={this.dragStart.bind(this)} onDragEnd={this.dragEnd}>
				<div onClick={this.editClick.bind(this)} hidden={this.state.display}>{this.state.text}</div>
				<a href="#" className="close" onClick={this.props.close}/>
				<div hidden={!this.state.display}>
					<textarea onKeyPress={this.updateText.bind(this)}></textarea>
					<button onClick= {this.save.bind(this)}>Save</button>
				</div>
			</div>
		)
	}
}

