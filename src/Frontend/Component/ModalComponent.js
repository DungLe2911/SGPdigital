import { Box, Button, Modal, Typography } from "@mui/material";
import '../Style/Manage.css'

export default function ModalComponent(props) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: '24px',
        p: 4,
      };
      
    return (
        <Modal
            open={props.open}
            onClose={props.closeModal}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {props.name} in {props.area}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <b>Regular Delete:</b>  Detele under the condition that the object is not bind to anything. This will return an error if the deleting object is binded somewhere
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <b>Force Delete:</b> Delete the object from existing, including the items that is binded with this object
                </Typography>
                <div className="modalBtnContainer">
                    <Button sx={{whiteSpace:'nowrap'}} variant='contained'>Force Delete</Button>
                    <Button sx={{whiteSpace:'nowrap'}} variant='contained'>Delete</Button>
                    <Button sx={{whiteSpace:'nowrap'}} variant='contained' onClick={props.closeModal}>Cancel</Button>
                </div>
            </Box>
        </Modal>
    )
}