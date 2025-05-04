import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import productList from '../Asset/ProductName.js';
import '../Style/QC.css'
import { toast } from "react-toastify";
import { submitRecord } from "../Utils/request.js";

export default function QCForm(props) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [hardShell, setHardShell] = useState('');
    const [innerShell, setInnerShell] = useState('');
    const [worm, setWorm] = useState('');
    const [blackPcs, setBlackPcs] = useState('');
    const [ForeignMaterial, setForeignMaterial] = useState('')
    const [picker, setPicker] = useState('');
    const [moisture, setMoisture] = useState('');


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'ForeignMaterial' || name === 'picker') {
            const hasDigits = /\d/.test(value);
            if (name === 'ForeignMaterial') {
                setForeignMaterial(hasDigits ? '' : value);
            } else if (name === 'picker') {
                setPicker(hasDigits ? '' : value);
            }
            return;
        }

        // Reject any value with 'e', 'E', '+', or '-' — basically anything non-numeric or scientific
        if (!/^\d*\.?\d*$/.test(value)) {
            return;
        }

        switch (name) {
            case 'hardShell':
                setHardShell(value);
                break;
            case 'innerShell':
                setInnerShell(value);
                break;
            case 'worm':
                setWorm(value);
                break;
            case 'blackPcs':
                setBlackPcs(value);
                break;
            case 'moisture':
                setMoisture(value);
                break;
            default:
                break;
        }
    };

    const handleInputBlur = (e) => {
        const { name, value } = e.target;

        let numValue = Number(value);
        if (value === '' || isNaN(numValue)) {
            numValue = '';
        }

        const setValue = (setter, min, max) => {
            if (numValue === '') {
                setter('');
            } else {
                // Clamp the value within min and max
                const clamped = Math.min(Math.max(numValue, min), max);
                setter(String(clamped));
            }
        };

        switch (name) {
            case 'hardShell':
                setValue(setHardShell, 0, 300);
                break;
            case 'innerShell':
                setValue(setInnerShell, 0, 300);
                break;
            case 'worm':
                setValue(setWorm, 0, 300);
                break;
            case 'blackPcs':
                setValue(setBlackPcs, 0, 300);
                break;
            case 'moisture':
                setValue(setMoisture, 200, 550);
                break;
            default:
                break;
        }
    };

    const restInputState = () => {
        setSelectedProduct(null);
        setHardShell('');
        setInnerShell('');
        setWorm('');
        setBlackPcs('');
        setForeignMaterial('')
        setPicker('');
        setMoisture('');
    }

    const handleSubmit = async()=>{
        if(selectedProduct === null){
            toast.error('A Product must be selected when submit a QC record')
            return;
        }
        if(selectedMachine.area === 'Picking'){
            if(picker === ''){
                toast.error('Please provide the name of the person is picking on the line')
                return;
            }

            if(moisture === 0 || moisture === ''){
                toast.error('Submission at the picking line requires ')
                return;
            }
            
        }
        
        
        const payload = {}
        const user = JSON.parse(localStorage.getItem('user'))
        payload.submittedBy = user._id
        payload.machine =  selectedMachine._id
        payload.name = selectedProduct.name
        payload.size = selectedProduct.size
        payload.shift = user.shift
        if(hardShell !== 0 && hardShell !== '') payload.hardShellCount = hardShell;
        if(innerShell !== 0 && innerShell !== '') payload.innerShellCount = innerShell;
        if(worm !== 0 && worm !== '') payload.wormCount = hardShell;
        if(blackPcs !== 0 && blackPcs !== '') payload.blackPieces = blackPcs;
        if(ForeignMaterial !== '') payload.other = ForeignMaterial;
        if(selectedMachine.area === 'Picking' && picker !== '') payload.picker = picker;
        if(selectedMachine.area === 'Picking' && moisture !== 0 && moisture !== '') payload.moisture = moisture;
        try{
            const response = await submitRecord(payload);
            console.log(response)
            props.setSubmissionHistory([...props.submissionHistory, response.data].sort((a,b)=>{return a.createAt - b.createAt}))
            restInputState();
            setSelectedMachine(null);
        }catch(err){

        }
    }

    const handleSelectMachine =(newMachine) =>{
        setSelectedMachine(newMachine)
        restInputState();
    }

    return (
        <div>
            <Typography component="span" sx={{ fontFamily: "'Arvo', serif", fontSize: '1.5em', fontWeight: 400 }}>Select a machine</Typography>
            <Autocomplete
                disablePortal
                value={selectedMachine}
                onChange={(event, newValue) => { handleSelectMachine(newValue) }}
                options={props.machineList || []}
                autoHighlight
                getOptionLabel={(option) => option?.name || ''}
                renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                        <Box key={key} component="li" {...optionProps}>
                            {option.name} - {option.area}
                        </Box>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Area List"
                        autoComplete="new-password"
                    />
                )}
            />
            {selectedMachine &&
                <div>
                    <div className='sectionDivider'>Requried Information</div>
                    <Autocomplete
                        disablePortal
                        className='productInput'
                        value={selectedProduct}
                        onChange={(event, newValue) => { setSelectedProduct(newValue) }}
                        options={productList || []}
                        autoHighlight
                        getOptionLabel={(option) => option?.name || ''}
                        renderOption={(props, option) => {
                            const { key, ...optionProps } = props;
                            return (
                                <Box key={key} component="li" {...optionProps}>
                                    {option.name} - {option.size}
                                </Box>
                            );
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Product Name"
                                autoComplete="new-password"
                            />
                        )}
                    />
                    <div className='qcForm'>
                        <Typography component="span" sx={{ fontFamily: "'Arvo', serif", fontSize: '1em', fontWeight: 400 }}>QC for {selectedMachine.area !== 'Sample' ? selectedMachine.area + ' Area -' : ''} {selectedMachine.name}</Typography>
                        <Box sx={{ marginTop: '10px', border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }} className='qcFormInput'>
                            <TextField name='hardShell' onBlur={handleInputBlur} onChange={handleInputChange} value={hardShell} label="Hard Shell" type="text" slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*', } }} variant="outlined" />
                            <TextField name='innerShell' onBlur={handleInputBlur} onChange={handleInputChange} value={innerShell} label="Inner Shell" type="text" slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*', } }} variant="outlined" />
                            <TextField name='worm' onBlur={handleInputBlur} onChange={handleInputChange} value={worm} label="Worm" type="text" slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*', } }} variant="outlined" />
                            <TextField name='blackPcs' onBlur={handleInputBlur} onChange={handleInputChange} value={blackPcs} label="Black Pieces" type="text" slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*', } }} variant="outlined" />
                            <TextField className='fullSpan' name='ForeignMaterial' placeholder='EX: Plastic, String, Stick, Rock' onBlur={handleInputBlur} onChange={handleInputChange} value={ForeignMaterial} label="Foreign Material" type="text" variant="outlined" />
                        </Box>
                    </div>
                    {selectedMachine.area === "Picking" && <div>
                        <div className='sectionDivider'>Additional Information</div>
                        <div className='qcForm'>
                            <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }} className='qcFormInput'>
                                <TextField className='fullSpan' name='picker' placeholder="Separate multiple pickers with commas" onBlur={handleInputBlur} onChange={handleInputChange} value={picker} label="Picker" type="text" variant="outlined" />
                                <TextField className='fullSpan' name='moisture' onBlur={handleInputBlur} onChange={handleInputChange} value={moisture} label="Moisture" type="text" slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*', } }} variant="outlined" />
                            </Box>
                        </div>
                    </div>}
                    <div className='divider' />
                    <div className='buttonGroup'>
                        {!props.edit && <Button variant="contained" color="success" onClick={handleSubmit} >Submit</Button>}
                        {props.edit && <Button variant="contained" color="success">Save Changes</Button>}
                        {!props.edit && <Button variant="secondary" onClick={()=>{
                            restInputState();
                            setSelectedProduct(null);
                        }}>clear</Button>}
                        {props.edit && <Button variant="secondary">Cancel</Button>}
                    </div>
                </div>}
        </div>
    )
}