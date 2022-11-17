import React from 'react'
import styles from './Button.module.scss'
import { Button as MuiBtn } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

const Button = (props) => {
  let button
  if (props.type === 'primary') {
    if (props.loginBtn) {
      button =
        <MuiBtn variant='outlined' onClick={props?.onClick}
          sx={{
            border: '1px solid #2575fc', color: '#2575fc', width: '100%', borderRadius: '15px', '&:hover': {
              background: "#2574fc1c",
            }
          }}
          type="submit"
          disabled={props.disabled}
        >
          {props.title}
        </MuiBtn>
    } else {
      button = <MuiBtn variant='outlined' onClick={props?.onClick}
        sx={{
          border: '1px solid #2575fc', color: '#2575fc', borderRadius: '15px', '&:hover': {
            background: "#2574fc1c"
          }
        }}

      >
        {props.title}
      </MuiBtn>
    }
  } else if (props.type === 'warning') {
    button = <button onClick={props?.onClick} className={styles.button__warning}>{props.title}</button>
  } else if (props.type === 'danger') {
    button = <MuiBtn variant='outlined' onClick={props?.onClick}
      sx={{
        border: '1px solid #DB190C', color: '#DB190C', borderRadius: '15px', '&:hover': {
          background: "#db1a0c25", borderColor: '#DB190C',
        }
      }}
    >
      {props.title}
    </MuiBtn>
  } else if (props.type === 'info') {
    button = <MuiBtn variant='outlined' onClick={props?.onClick}
      sx={{
        border: '1px solid #4E4D4F', color: '#4E4D4F', borderRadius: '15px', margin: `${props.margin}`, '&:hover': {
          background: "#4e4d4f17", borderColor: '#4E4D4F',
        }
      }}
    >
      {props.title}
    </MuiBtn>
  }
  return (
    <>
      {button}
    </>
  )
}

export default Button