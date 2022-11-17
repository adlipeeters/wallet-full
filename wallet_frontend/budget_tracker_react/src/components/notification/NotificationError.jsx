import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';


function TransitionRight(props) {
    return <Slide {...props} direction="down" />;
}
export default function PositionedSnackbar({ isOpen, title }) {
    const [state, setState] = React.useState({
        open: isOpen,
        vertical: 'top',
        horizontal: 'right',
    });

    const { vertical, horizontal, open } = state;

    // const handleClick = (newState) => () => {
    //     setState({ open: true, ...newState });
    // };

    const handleClose = (props) => {
        setState({ ...state, open: false });
    };

    return (
        <div>
            {/* {buttons} */}
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message=""
                key={vertical + horizontal}
                autoHideDuration={3500}
                TransitionComponent={TransitionRight}
            // ContentProps={{
            //   sx: {
            //     background: "green"
            //   }
            // }}
            >
                <Alert
                    sx={{
                        background: "white",
                        borderRadius: "30px",
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        color: '#4E4D4F'
                    }}
                >
                    <b>Success</b><br />
                    {title}
                </Alert>
            </Snackbar>
        </div>
    );
}
