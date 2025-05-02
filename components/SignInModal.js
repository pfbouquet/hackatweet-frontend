// SignInModal.js
import React from 'react';
import { Modal, Input, Button } from 'antd';
import styles from '../styles/SignInModal.module.css';

const SignInModal = ({ visible, onCancel }) => {
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
        <h2>Create your Hackatweet account</h2>
        <Input placeholder="Firstname" className={styles.input} />
        <Input placeholder="Username" className={styles.input} />
        <Input.Password placeholder="Password" className={styles.input} />
        <Button type="primary" className={styles.signupButton}>
          Sign up
        </Button>
      </div>
    </Modal>
  );
};

export default SignInModal;
