import { useState } from 'react'
import '../Style/Manage.css'
import { Autocomplete, Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { addNewMachine } from '../Utils/request.js';

export default function ManageMachine(props) {
    const [newMachineName, setNewMachineName] = useState('')
    const [selectedArea, setSelectedArea] = useState(null)
    // const [newMachineArea, setNewMachineArea] = useState('');
    const [newMachineGroup, setNewMachineGroup] = useState('');
    const [newMachineGroupInput, setNewMachineGroupInput] = useState('');


    const handleAddMachine = async () => {

        if (newMachineName === '' || selectedArea === null) {
            toast.error('Adding a new machine require both name and area assigned to');
        } else {
            const newMachine = {
                name: newMachineName,
                area: selectedArea._id
            };
            if (selectedArea.type === 'Machine' && newMachineGroup === '') {
                toast.error('Machine group is required to add a new machine');
            } else {
                if (newMachineGroup !== '') {
                    newMachine.groupType = newMachineGroup;
                }

                try {
                    const response = await addNewMachine(newMachine);
                    const temp = response.data;
                    props.setMachineList([...props.machineList, temp].sort((a, b) => { return a.name.localeCompare(b.name) }));
                } catch (err) {

                }
                resetState();
            }

        }
    }

    const handleChangeArea = (areaObject) => {
        setSelectedArea(areaObject);
        if (areaObject && areaObject.type !== 'Machine') {
            setNewMachineGroup('');
        }
    }

    const resetState = () => {
        setNewMachineGroup('');
        setSelectedArea(null);
        setNewMachineName('');
    }

    return (
        <div>
            <div className='createAccountContainer'>
                <h2 className='panelTitle'>Add a Machine</h2>
                <div className='addMachineFields'>
                    <TextField placeholder='Ex: LMC 1' required value={newMachineName} onChange={(e) => { setNewMachineName(e.target.value) }} label="Machine name" variant='outlined' />
                    <Autocomplete
                        disablePortal
                        value={selectedArea}
                        onChange={(event, newValue) => handleChangeArea(newValue)}
                        options={props.areaList || []}
                        autoHighlight
                        getOptionLabel={(option) => option?.type || ''}
                        renderOption={(props, option) => {
                            const { key, ...optionProps } = props;
                            return (
                                <Box key={key} component="li" {...optionProps}>
                                    {option.type}
                                </Box>
                            );
                        }}
                        renderInput={(params) => (
                            <TextField
                                required={true}
                                {...params}
                                label="Area List"
                                autoComplete="new-password"
                            />
                        )}
                    />

                    {selectedArea && selectedArea.type === "Machine" ?
                        <Autocomplete
                            freeSolo
                            disablePortal
                            value={newMachineGroup}
                            inputValue={newMachineGroupInput}
                            onChange={(event, newValue) => {
                                setNewMachineGroup(newValue || newMachineGroupInput); // Use inputValue as fallback
                            }}
                            onInputChange={(event, newInputValue) => {
                                setNewMachineGroupInput(newInputValue);
                                // When in freeSolo mode, also update the actual value when typing
                                if (event) {
                                    setNewMachineGroup(newInputValue);
                                }
                            }}

                            options={[...new Set((props.machineList || []).map(machine => machine.groupType).filter(Boolean))]}
                            autoHighlight
                            renderOption={(props, option) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <Box key={key} component="li" {...optionProps}>
                                        {option}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    required={true}
                                    {...params}
                                    label="Machine Group"
                                    autoComplete="new-password"
                                />
                            )}
                        /> :
                        <></>
                    }
                    <Button variant='contained' onClick={handleAddMachine}>Add Machine</Button>
                </div>
            </div>
            <div className='manageUserDivider'>Machine List</div>
            <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}>
                {props.areaList.map((area, index) => (
                    <div key={index} className='machineContainer'>
                        <Typography component="h2" sx={{ fontFamily: "'Arvo', serif", fontSize: '25px', fontWeight: 400 }}>
                            {area.type}
                        </Typography>

                        {area.type === 'Machine' ? (
                            // Group by groupType for Machine areas
                            Object.entries(
                                props.machineList
                                    .filter(machine => machine.area === area._id)
                                    .reduce((groups, machine) => {
                                        const groupKey = machine.groupType || 'Ungrouped';
                                        if (!groups[groupKey]) groups[groupKey] = [];
                                        groups[groupKey].push(machine);
                                        return groups;
                                    }, {})
                            ).map(([groupType, machines]) => (
                                <Box key={groupType} sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px', margin: '15px 0px' }}>
                                    <Typography component='h2' sx={{ fontFamily: "'Arvo', serif", fontWeight: "bold", transform: 'translateY(-90%)', index: 1, width: 'fit-content', padding: '0px 10px', backgroundColor: 'white' }}>{groupType}</Typography>
                                    <Box sx={{display:"flex", flexDirection: 'row', alignItems:'center',  gap:'10px', flexWrap:'wrap', justifyContent:'flex-start'}}>
                                    {
                                        machines.map((machine, idx) => (
                                            <MenuItem key={idx} onClick={props.openModal}>{machine.name}</MenuItem>
                                        ))
                                    }
                                    </Box>
                                </Box>
                            ))
                        ) : (
                            // Regular display for non-Machine areas
                            <Box sx={{display:"flex", flexDirection: 'row', alignItems:'center',  gap:'10px', flexWrap:'wrap', justifyContent:'flex-start', marginLeft:'10px'}}>
                                {props.machineList
                                    .filter(machine => machine.area === area._id)
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map((machine, indexM) => (
                                        // <div key={indexM} style={{ marginLeft: '15px' }}>{machine.name}</div>
                                        <MenuItem key={indexM} onClick={props.openModal}>{machine.name}</MenuItem>
                                    ))}
                            </Box>
                        )}
                    </div>
                ))}
            </Box>
        </div>
    )
}