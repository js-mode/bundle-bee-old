import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import Modal from 'react-modal';
import { isLoading } from '../redux/actions/homeActions';
import { connect } from 'react-redux';

import { Button, Typography, TextField, Paper } from '@material-ui/core'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme.js';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '.5rem',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#app');

class ModalPrompt extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: true,
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ modalIsOpen: true });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = '#1B6453';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <Paper>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
<<<<<<< HEAD
        <Typography>
          <h2 ref={subtitle => this.subtitle = subtitle}>CLICK A BUTTON TO CONTINUE</h2>
          </Typography>
          <Button onClick={(e) => {
            e.preventDefault();
            // this.props.dispatchLoading(true);
          }}
            className="user-prompt">Use Existing Webpack</Button>
          <Button onClick={(e) => {
            e.preventDefault();
            // this.props.dispatchLoading(false);
          }} className="user-prompt">Create New Webpack</Button>
=======
          <h2 ref={subtitle => (this.subtitle = subtitle)}>CLICK A BUTTON TO CONTINUE</h2>
          <button
            onClick={e => {
              e.preventDefault();
              console.log('testing');
              ipcRenderer.send('run-webpack', { createNewConfig: false });
              // this.props.dispatchLoading(true);
            }}
            className="user-prompt"
          >
            Use Existing Webpack
          </button>
          <button
            onClick={e => {
              e.preventDefault();
              ipcRenderer.send('run-webpack', { createNewConfig: true });

              // this.props.dispatchLoading(false);
            }}
            className="user-prompt"
          >
            Create New Webpack
          </button>
>>>>>>> c7a04e8a96b5bb682eadb1c83f8b033de590cf28
        </Modal>
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  /*dispatchLoading: (loaded) => dispatch(isLoading(loaded))*/
});
export default connect(
  null,
  mapDispatchToProps
)(ModalPrompt);
