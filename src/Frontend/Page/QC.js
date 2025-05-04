import { Autocomplete, Box, Button, Tab, TextField, Typography } from '@mui/material'
import '../Style/QC.css'
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useEffect, useState } from 'react';
import { authCheck, logUserOut } from '../Utils/request.js';
import productList from '../Asset/ProductName.js';
export default function QC() {
    const [curTab, setCurTab] = useState("1");
    const [machineList, setMachineList] = useState([]);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [hardShell, setHardShell] = useState('');
    const [innerShell, setInnerShell] = useState('');
    const [worm, setWorm] = useState('');
    const [blackPcs, setBlackPcs] = useState('');
    const [ForeignMaterial, setForeignMaterial] = useState('')
    const [picker, setPicker] = useState('');
    const [moisture, setMoisture] = useState('');
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        const initializeData = async () => {
            try {
                const authResponse = await authCheck();
                if (!authResponse.data.isAuthenticated) {
                    return;
                }
                let user = localStorage.getItem('user');
                if (!user) {
                    await logUserOut();
                    return;
                }
                user = JSON.parse(user)
                setMachineList(user.assignedMachine.sort((a, b) => { return a.name.localeCompare(b.name) }))

            } catch (error) {
                console.error("Error initializing data:", error);
            }
        };
        initializeData();

    }, []);
    const handleTabChange = async (event, newTab) => {
        setCurTab(newTab);
        if (newTab === "1") {

        } else if (newTab === "2") {

        }
    };

    const restState = () => {
        setSelectedMachine(null);
        setSelectedProduct(null);
        setHardShell('');
        setInnerShell('');
        setWorm('');
        setBlackPcs('');
        setForeignMaterial('')
        setPicker('');
        setMoisture('');
    }

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





    return (
        <div className="qcPageContainer">
            <Box>
                <TabContext value={curTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={(handleTabChange)} aria-label="good job">
                            <Tab label="QC Form " value="1" />
                            <Tab label="History" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Typography component="span" sx={{ fontFamily: "'Arvo', serif", fontSize: '1.5em', fontWeight: 400 }}>Select a machine</Typography>
                        <Autocomplete
                            disablePortal
                            value={selectedMachine}
                            onChange={(event, newValue) => { setSelectedMachine(newValue) }}
                            options={machineList || []}
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
                                        <TextField className='fullSpan' name='ForeignMaterial' onBlur={handleInputBlur} onChange={handleInputChange} value={ForeignMaterial} label="Foreign Material" type="text" variant="outlined" />
                                    </Box>
                                </div>
                                {selectedMachine.area === "Picking" && <div>
                                    <div className='sectionDivider'>Additional Information</div>
                                    <div className='qcForm'>
                                        <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }} className='qcFormInput'>
                                            <TextField className='fullSpan' name='picker' onBlur={handleInputBlur} onChange={handleInputChange} value={picker} label="Picker" type="text" variant="outlined" />
                                            <TextField className='fullSpan' name='moisture' onBlur={handleInputBlur} onChange={handleInputChange} value={moisture} label="Moisture" type="text" slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*', } }} variant="outlined" />
                                        </Box>
                                    </div>
                                </div>}
                                <div className='divider' />
                                <div className='buttonGroup'>
                                    {!edit && <Button variant="contained" color="success">Submit</Button>}
                                    {edit && <Button variant="contained" color="success">Save Changes</Button>}
                                    {!edit&&<Button variant="secondary" onClick={restState}>clear</Button>}
                                    {edit && <Button variant="secondary">Cancel</Button>}
                                </div>
                            </div>}
                    </TabPanel>
                    <TabPanel value="2">
                        Submission record of the day goes here
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}