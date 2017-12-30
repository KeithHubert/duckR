import React from 'react'
import PropTypes from 'prop-types'
// importing react-modal and naming it ReactModal inside of this file so we don't confuse it with our "modal"
import { default as ReactModal } from 'react-modal'
import {
  newDuckTop, pointer, newDuckInputContainer,
  newDuckInput, submitDuckBtn, darkBtn } from './styles.css'

// ReactModal takes object as style
const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
  },
}

const { object, string, func, bool } = PropTypes
Modal.propTypes = {
  duckText: string.isRequired,
  closeModal: func.isRequired,
  isOpen: bool.isRequired,
  isSubmitDisabled: bool.isRequired,
  openModal: func.isRequired,
  updateDuckText: func.isRequired,
  user: object.isRequired,
}

export default function Modal (props) {
  function submitDuck () {
    console.log('user', props.user)
    console.log('text', props.duckText)
  }
  return (
    <span className={darkBtn} onClick={props.isOpen ? undefined : props.openModal}>
      {'duck'}
      <ReactModal
        ariaHideApp={false}
        style={modalStyles}
        isOpen={props.isOpen}
        onRequestClose={props.closeModal}>
        <div className={newDuckTop}>
          <span> {'Compose a new Duck'} </span>
          <span onClick={props.closeModal} className={pointer}> {'x'} </span>
        </div>
        <div className={newDuckInputContainer}>
          <textarea
            onChange={(e) => props.updateDuckText(e.target.value)}
            value={props.duckText}
            maxLength={140}
            type='text'
            className={newDuckInput}
            placeholder="What's on your mind?" />
        </div>
        <button
          className={submitDuckBtn}
          disabled={props.isSubmitDisabled}
          onClick={submitDuck}>
          {'Duck'}
        </button>
      </ReactModal>
    </span>
  )
}
