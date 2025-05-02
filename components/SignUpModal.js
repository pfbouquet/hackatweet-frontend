// SignUpModal.js
import React from 'react';
import { Modal, Input, Button } from 'antd';
import styles from '../styles/SignUpModal.module.css';
// import {useState} from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { login, logout } from '../reducers/user';

// const [signUpUsername, setSignUpUsername] = useState('');
// const [signUpPassword, setSignUpPassword] = useState('');
// const [signUpKickername, setSignUpKickername] = useState('');



const SignUpModal = ({ visible, onCancel }) => {
  const handleSignUp = () => {
    fetch('http://localhost:3000/users/kickup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname: signUpUsername, password: signUpPassword, username: signUpKickername }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          // dispatch(login({ firstname: signUpUsername, token: data.token }));
          // setSignUpUsername('');
          // setSignUpPassword('');
          // setSignUpKickername('');
        }
      });
  };
  
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      closable={true}
      className={styles.modal}
      centered
    >
      <div className={styles.content}>
        <img src="/logo_white.webp" alt="Logo" className={styles.logo} />
        <h2>Create ton kick account</h2>
        <Input className={styles.input} placeholder="Premiername" />
        <Input placeholder="Kickername" className={styles.input} />
        <Input.Password placeholder="JCVDMDP" className={styles.input} />
        <Button type="primary" className={styles.signupButton} onClick={() => handleSignUp()}>
          Kick up
        </Button>
      </div>
    </Modal>
  );
};


export default SignUpModal;