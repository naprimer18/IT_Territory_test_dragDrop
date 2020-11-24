import React from 'react';
import withHocs from './todoListHoc';
import ModalComponent from './modalWindow'

class TodoList extends React.Component {
  state = {
    serchName:'',
    isDone: false,
    renameisDone: false,
    name: '',
    rename: '',
    renameId:'',
    flagEdit: false,
    flagAdd: false,
    currentNote: null,
    noteList: []
  }
  componentWillReceiveProps(newProps) {
        if(newProps !== this.props) {
          this.setState({
            noteList: newProps.data.Notes.map((item,index) => (
              {
              name:item.name,
              id:item.id,
              isDone:item.isDone,
              position:index
            }
            )
          )
        })
      }
    }
  handleSearch = (e) => {
    const { data } = this.props;
    const { serchName } = this.state;
   
    if(e.charCode === 13) {
      data.fetchMore({
        variables: {serchName},
        updateQuery: (previousResult, { fetchMoreResult}) => fetchMoreResult
      })
    }
  }
  deletNoteTitle = (id) => {
    this.props.deleteNoteTitle({id})
  }
  closeModal = () => {
    this.setState({flagEdit: false , flagAdd: false })
  }
  dragStartHadler = (e,item) => {
    this.setState({currentNote: item});
  }
  dragEndHadler = e => {
    e.target.style.background = 'bisque'
  }
  dragOverHadler = e => {
    e.preventDefault()
    e.target.style.background = 'lightgray'
  }
  dragDropHadler = (e,noteDrop) => {
    e.preventDefault()
    this.setState({
      noteList: this.state.noteList.map((note,index) => {
        if(note.id === noteDrop.id) {
          return {...note,position:this.state.currentNote.position}
        }
        if(note.id === this.state.currentNote.id){
          return {...note,position:noteDrop.position}
        }
        return note
      })
    })
    e.target.style.background = 'bisque'
  }
  sortNotes = (a,b) => {
    if(a.position > b.position) {
      return 1;
    } else {
      return -1
    }
  }
  render() {
    const { flagEdit, renameisDone, isDone ,flagAdd, renameId , rename, name , noteList = []} = this.state;
    const { renameNoteTitle, addNoteTitle} = this.props;
    const propsByModal = flagEdit ? {
      renameNoteTitle: renameNoteTitle,
      name: rename,
      isDone: renameisDone,
      nameId: renameId,
      flag: flagEdit,
      titleModal: 'Change',
      closeModal: () => this.closeModal()
    }:{
      name: name,
      isDone: isDone,
      addNoteTitle: addNoteTitle,
      flag: flagAdd,
      titleModal: 'Create',
      closeModal: () => this.closeModal()
    }

    return (
      <>
        <div>
          <input placeholder='Search...' onKeyPress={(e) => this.handleSearch(e)} onChange={(e) => this.setState({serchName: e.target.value})}></input>
          <button onClick={() => this.setState({flagAdd: !flagAdd})}>Add new Note</button>
        </div>
        <div className="names-ground">
          { 
            noteList.sort(this.sortNotes).map((item, key) => 
              <div className="items"
                key={key} 
                draggable={true}
                onDragStart={e => this.dragStartHadler(e,item)}
                onDragLeave={e => this.dragEndHadler(e)}
                onDragEnd={e => this.dragEndHadler(e)}
                onDragOver={e => this.dragOverHadler(e)}
                onDrop={e => this.dragDropHadler(e,item)}
              >
                <button className="delet-button" onClick={() => this.deletNoteTitle(item.id)}>X</button>
                <button className="edit-button" onClick={() => this.setState({flagEdit: !flagEdit, renameId: item.id , rename: item.name , renameisDone: item.isDone })}>Edit</button>
                <div>
                  {item.name} 
                  {item.isDone ? <label className="isDone-label" > ✓</label> : null}
                </div>
              </div>)
          } 
        </div>

        <ModalComponent {...propsByModal}/>
       
      </>
    )  
  };
}

export default withHocs(TodoList);
