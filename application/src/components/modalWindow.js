import React, { Component } from 'react';
import Modal from 'react-modal';
import Checkbox from 'react-simple-checkbox';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : 'rgb(84, 126, 162)',
    color                 : '#ffffff'
  }
};

export default class ModalComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {
        name: this.props.name,
        isDone: this.props.isDone,
        nameId: this.props.nameId,
        flag: this.props.flag,
      }
  }

  componentWillReceiveProps(newProps) {
      if(newProps !== this.props) {
        this.setState({
            flag: newProps.flag,
            nameId: newProps.nameId,
            isDone: newProps.isDone,
            name: newProps.name
        })
      }
  }

  renameNoteTitle = () => {
    const { name, nameId, isDone} = this.state
    this.props.renameNoteTitle({nameId,name,isDone})
    this.setState({name: '', nameId:''})
    this.props.closeModal()
  }

  addNewNoteTitle = () => {
    const { name, isDone } = this.state;
    if(name !== "") {
      this.props.addNoteTitle({name,isDone})
      this.setState({name: '',isDone: false})
      this.props.closeModal()
    }
  }

  render() {
      const { isDone, flag } = this.state;
      const { closeModal, titleModal, renameNoteTitle } = this.props;
      return(
        <div>
           <Modal
            isOpen={flag}
            style={customStyles}
            ariaHideApp={false}>
                <div>
                    <span>
                        <h2>{titleModal}</h2>
                    </span>
                    <button className="close-modal-button" onClick={closeModal}>X</button>
                </div>

                <div className="item-container-modal">
                    <div>
                        <label>New Name</label>
                        <input value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}></input>
                    </div>
                    {renameNoteTitle !== undefined ?
                        <div>
                            <label>Is Done</label>
                            <Checkbox size={3} checked={isDone} onChange={() => this.setState({ isDone: !isDone})}/>
                        </div>
                    : null}
                </div>

                <button className="modal-footer-button" onClick={() => renameNoteTitle !== undefined ? this.renameNoteTitle() : this.addNewNoteTitle() }>{titleModal}</button>

            </Modal> 
        </div>   
    );
  }
}
