import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'

export const BackButton = () => {
    let navigate = useNavigate();
    return(
        <>
            <Button id="back-button"onClick={() => navigate(-1)} variant="contained">Back</Button>
        </>
    )
}