import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';


function TransitionRight(props) {
    return <Slide {...props} direction="down" />;
}
export default function PositionedSnackbar({ isOpen, title, vertical, horizontal, type }) {
    const [state, setState] = React.useState({
        open: isOpen,
        vertical: vertical,
        horizontal: horizontal,
        type: type
    });




    // console.log(state)

    // const { vertical, horizontal, open } = state;

    // const handleClick = (newState) => () => {
    //     setState({ open: true, ...newState });
    // };

    const handleClose = (props) => {
        setState({ ...state, open: false });
    };

    let alertType
    if (state.type === 'error') {
        alertType = 'error';
    } else if (state.type === 'success') {
        alertType = 'success';
    } else if (state.type === 'warning') {
        alertType = 'warning';
    } else if (state.type === 'info') {
        alertType = 'info';
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={state.open}
                onClose={handleClose}
                message=""
                key={vertical + horizontal}
                autoHideDuration={3500}
                TransitionComponent={TransitionRight}
            >
                <Alert
                    sx={{
                        background: "white",
                        borderRadius: "30px",
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        color: '#4E4D4F',
                        minWidth: '250px',
                    }}
                    severity={alertType}
                >
                    <b>{alertType.charAt(0).toUpperCase() + alertType.slice(1)}</b><br />
                    {title}
                </Alert>
            </Snackbar>
        </div>
    );
}
