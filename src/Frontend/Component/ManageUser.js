// components/ManageUser.jsx
import { Accordion, AccordionDetails, AccordionSummary, alpha, Autocomplete, Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, styled, Switch, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { ExpandMore } from '@mui/icons-material';
import '../Style/Font.css'
import { green } from '@mui/material/colors';
import '../Style/Manage.css';
import { createUser, saveUser } from '../Utils/request.js';


const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: green[600],
        '&:hover': {
            backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: green[600],
    },
}));


const label = { inputProps: { 'aria-label': 'Color switch demo' } };


export default function ManageUser(props) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    /******************** User Info Setting *****************************/
    const [username, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [shift, setShift] = useState(1);
    const [role, setRole] = useState('');
    const [assignedMachine, setAssignedMachine] = useState([]);
    const [active, setActive] = useState(false);

    const handleSelectUser = (newUser) => {
        setUserInfo(newUser)
        setUserName(newUser.username)
        setFirstName(newUser.firstName)
        setLastName(newUser.lastName)
        setShift(newUser.shift);
        setRole(newUser.role);
        setAssignedMachine(newUser.assignedMachine);
        setActive(newUser.active)
    }

    const resetInfoStat = () => {
        setUserName('');
        setFirstName('');
        setLastName('');
        setShift(1);
        setRole('');
        setAssignedMachine([]);
        setActive(false);
    }

    const handleAssignMachine = (machineId) => {
        if (assignedMachine && assignedMachine.includes(machineId)) {
            setAssignedMachine(assignedMachine.filter(item => item !== machineId));
        } else {
            setAssignedMachine([...assignedMachine, machineId])
        }
    }

    const handleSaveChange = async () => {
        const object = userInfo;
        let count = 0;
        if (username !== object.username) count += 1;
        if (firstName !== object.firstName) count += 1;
        if (lastName !== object.lastName) count += 1;
        if (shift !== object.shift) count += 1;
        if (role !== object.role) count += 1;
        if (JSON.stringify(assignedMachine) !== JSON.stringify(object.assignedMachine)) count += 1;
        if (active !== object.active) count += 1;
        //update chagnes to temp object;
        if (count !== 0) {
            object.username = username;
            object.firstName = firstName;
            object.lastName = lastName;
            object.shift = shift;
            object.role = role;
            object.assignedMachine = assignedMachine;
            object.active = active;

            try {
                saveUser(object);
                //get list without the current object being changed
                let list = props.userList.filter(item => item._id !== userInfo._id);
                //add new changes back into the list
                list = [...list, object];
                //update changes
                props.setUserList(list);
            } catch (err) {

            }
        }
        resetInfoStat();
        setUserInfo(null);
    }

    const handleCancelChange = () => {
        resetInfoStat();
        setUserInfo(null);
    }

    const handleCreateAccount = async () => {
        const object = {};
        //update chagnes to temp object;
        object.username = username;
        object.firstName = firstName;
        object.lastName = lastName;
        try {
            const response = await createUser(object);
            const savedUser = response.data;
            handleSelectUser(savedUser);
        } catch (err) {

        }
    }

    return (
        <div>
            <h2 className='panelTitle'>Choose a user to update </h2>
            <Autocomplete
                disablePortal
                disabled={userInfo != null || username !== '' || firstName !== '' || lastName !== ''}
                value={selectedUser}
                onChange={(event, newValue) => setSelectedUser(newValue)}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                options={props.userList.sort((a, b) => -b.firstName.localeCompare(a.firstName))}
                groupBy={(option) => option.firstName.charAt(0).toUpperCase()}
                autoHighlight
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                        <Box key={key} component="li" {...optionProps}>
                            {option.firstName} {option.lastName}
                        </Box>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="User List"
                        autoComplete="new-password"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const isDropdownOpen = document.querySelector('.MuiAutocomplete-popper');
                                if (!isDropdownOpen) {
                                    e.preventDefault();
                                    handleSelectUser(selectedUser);
                                    setSelectedUser(null);
                                    setInputValue('');
                                }
                            }
                        }}
                    />
                )}
            />
            <div className='manageUserDivider'>OR</div>
            <div className='createAccountContainer'>
                <h2 className='panelTitle'>Create an account </h2>
                <div className='createAccoutFields'>
                    <TextField required disabled={userInfo !== null || selectedUser !== null} value={username} onChange={(e) => { setUserName(e.target.value) }} label="Username" variant='outlined' />
                    <TextField required disabled={userInfo !== null || selectedUser !== null} value={firstName} onChange={(e) => { setFirstName(e.target.value) }} label="First Name" variant='outlined' />
                    <TextField required disabled={userInfo !== null || selectedUser !== null} value={lastName} onChange={(e) => { setLastName(e.target.value) }} label="Last Name" variant='outlined' />
                </div>
                <div className='createAccoutBtnContainer'>
                    <Button disabled={userInfo !== null || selectedUser !== null} variant='contained' onClick={handleCreateAccount}>Create Account</Button>
                </div>
            </div>

            {userInfo && (
                <div>
                    <div className='manageUserDivider'>User Info</div>
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel3-content">
                            <Typography component="span" sx={{ fontFamily: "'Arvo', serif", fontSize: '1.5em', fontWeight: 400 }}>Basic Info</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}>
                            <div className='createAccoutFields'>
                                <TextField required value={username} onChange={(e) => setUserName(e.target.value)} label="Username" variant='outlined' />
                                <TextField required value={firstName} onChange={(e) => setFirstName(e.target.value)} label="First Name" variant='outlined' />
                                <TextField required value={lastName} onChange={(e) => setLastName(e.target.value)} label="Last Name" variant='outlined' />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel3-content">
                            <Typography component="span" sx={{ fontFamily: "'Arvo', serif", fontSize: '1.5em', fontWeight: 400 }}>Account Info</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}>
                            <div className='accountInfoContainer'>
                                <FormControlLabel
                                    control={<GreenSwitch {...label} checked={active} onChange={(e) => { setActive(e.target.checked) }} />}
                                    labelPlacement="start"
                                    label="Active status:"
                                    sx={{ marginLeft: 0 }}
                                />
                                <div className='roleContainer'>
                                    <Typography
                                        sx={{
                                            fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
                                            fontSize: '1em',
                                            fontWeight: 400
                                        }}
                                        variant="h6"
                                        component="h2"
                                        gutterBottom>
                                        Role:
                                    </Typography>
                                    <RadioGroup row value={role} onChange={(e) => setRole(e.target.value)}>
                                        <FormControlLabel value="QC" control={<Radio />} label="QC" />
                                        <FormControlLabel value="Supervisor" control={<Radio />} label="Supervisor" />
                                        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                                    </RadioGroup>

                                </div>
                                <FormControl sx={{ width: 100 }}>
                                    <InputLabel id="userShift">Shift</InputLabel>
                                    <Select labelId="userShift" value={shift} label="Shift" onChange={(e) => setShift(Number(e.target.value))}>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                    </Select>
                                </FormControl>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
                                            fontSize: '1em',
                                            fontWeight: 400
                                        }}
                                        variant="h6"
                                        component="h2"
                                        gutterBottom
                                    >
                                        Machine Access List By Area
                                    </Typography>

                                    <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}>
                                        {props.areaList.map((area, indexA) => {
                                            // Machines in the current area
                                            const machinesInArea = props.machineList.filter(
                                                (machine) => machine.area === area._id
                                            );

                                            // Group machines by groupType
                                            const groupMap = {};
                                            machinesInArea.forEach((machine) => {
                                                const group = machine.groupType || 'Ungrouped';
                                                if (!groupMap[group]) groupMap[group] = [];
                                                groupMap[group].push(machine);
                                            });

                                            return (
                                                <Box key={indexA} sx={{ marginBottom: '24px' }}>
                                                    <Typography sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                                                        {area.type}
                                                    </Typography>

                                                    {Object.entries(groupMap).map(([groupName, machines]) => (
                                                        <Box key={groupName} sx={{ paddingLeft: '16px', marginBottom: '16px' }}>
                                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                                                {machines.map((machine) => (
                                                                    <FormControlLabel
                                                                        key={machine._id}
                                                                        control={
                                                                            <GreenSwitch
                                                                                {...label}
                                                                                checked={
                                                                                    Array.isArray(assignedMachine) &&
                                                                                    assignedMachine.includes(machine._id)
                                                                                }
                                                                                onChange={() => handleAssignMachine(machine._id)}
                                                                            />
                                                                        }
                                                                        labelPlacement="start"
                                                                        label={machine.name}
                                                                        sx={{ marginLeft: 0 }}
                                                                    />
                                                                ))}
                                                            </Box>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                </Box>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <div className='userInfoBtnContainer'>
                        <Button variant='contained' color='success' onClick={handleSaveChange}>Save changes</Button>
                        <Button variant='contained' onClick={handleCancelChange}>Cancel</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
