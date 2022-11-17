import React from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import styles from './Welcome.module.scss'
import { Player } from '@lottiefiles/react-lottie-player';
import { images } from '../../../constants'
import Grid from '@mui/material/Grid';
import Header from './Header'
import Typography from '@mui/material/Typography';
import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate, Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <>
      {/* <Header /> */}
      <div className={styles.main}>
        <div className='container'>
          <div className="row">
            <div className="col-6 col-md-6 col-sm-12">
              <Player
                className={styles.player}
                src={images.lottie
                }
                loop
                autoplay
              />
            </div>
            <div className={`col-6 col-md-6 col-sm-12 ${styles.secondColumn}`} style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', justifyContent: 'center', textAlign: 'right', }}>
              <h1 className={styles.title}>
                Start saving your money<br /> right now
              </h1>
              <Link to='pricing'>

                <button className={styles.getStartedBtn}>
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Welcome