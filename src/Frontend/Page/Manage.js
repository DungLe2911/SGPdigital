import { Autocomplete, Box, Button, Switch, Tab, TextField } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import '../Style/Manage.css';
import { useState, useEffect } from 'react';

export default function Manage() {
    const [curTab, setCurTab] = useState("1");
    const [width, setWidth] = useState(window.innerWidth);
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // control selected value
    const [inputValue, setInputValue] = useState('');
    const [userInfo, setUserInfo] = useState(null)// the actual selected user

    // Optional: Handle window resizing
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleTabChange = (event, newTab) => {
        setCurTab(newTab);
        if (newTab === "1") {

        } else if (newTab === "2") {
            //need pulling list of user later
            const temp = [
                {
                    username: "jsmith42",
                    firstName: "John",
                    lastName: "Smith",
                    role: "QC",
                    shift: 1,
                    assignedAreas: ["64a2a8f73c91e453b5f9e8d1", "64a2a8f73c91e453b5f9e8d3"],
                    active: true
                },
                {
                    username: "mjohnson85",
                    firstName: "Maria",
                    lastName: "Johnson",
                    role: "Supervisor",
                    shift: 2,
                    assignedAreas: ["64a2a8f73c91e453b5f9e8d2", "64a2a8f73c91e453b5f9e8d4", "64a2a8f73c91e453b5f9e8d5"],
                    active: true
                },
                {
                    username: "agarcia123",
                    firstName: "Alex",
                    lastName: "Garcia",
                    role: "Admin",
                    shift: 3,
                    assignedAreas: [],
                    active: false
                }
            ];
            setUserList(temp);
        } else {

        }
    };
    return (
        <>
            {width < 700 ? (
                <div className='ManagePageWarning'>
                    <div className='managePageTitle'>Your screen is not big enough</div>
                    <div className='managePageTitleText'>
                        Please consider switching to desktop to change/make any setting
                    </div>
                </div>
            ) : (
                <div className='managePageContainer'>
                    <Box>
                        <TabContext value={curTab}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleTabChange} aria-label="good job">
                                    <Tab label="Machine Setting" value="1" />
                                    <Tab label="User Setting" value="2" />
                                    <Tab label="Item Three" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                
                            </TabPanel>
                            <TabPanel value="2">
                                <h2 className='panelTitle'>Choose a user to update </h2>
                                <Autocomplete
                                    disablePortal
                                    value={selectedUser}
                                    onChange={(event, newValue) => {
                                        setSelectedUser(newValue);
                                    }}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                    }}
                                    options={userList.sort((a, b) => -b.firstName.localeCompare(a.firstName))}
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
                                                        console.log('Input submitted:', inputValue);
                                                        setUserInfo(selectedUser)
                                                        console.log(selectedUser)
                                                        // Reset values
                                                        setSelectedUser(null);
                                                        setInputValue('');
                                                    } else {
                                                        console.log('Autocomplete option selected');
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
                                        <TextField required disabled={userInfo !== null} label="Username" variant='outlined' />
                                        <TextField required disabled={userInfo !== null} label="First Name" variant='outlined' />
                                        <TextField required disabled={userInfo !== null} label="Last Name" variant='outlined' />
                                    </div>
                                    <div className='createAccoutBtnContainer'>
                                        <Button variant='contained'  >Create Account</Button>

                                    </div>
                                </div>
                                {userInfo ?
                                    <div>
                                        <div className='manageUserDivider'> User Info </div>
                                        <Switch
                                            checked={false}
                                            sx={{
                                                '& .MuiSwitch-switchBase.Mui-checked': {
                                                    color: 'primary.main', // Button color when checked
                                                    '& + .MuiSwitch-track': {
                                                        backgroundColor: 'primary.main', // Background color when checked
                                                    },
                                                },
                                                '& .MuiSwitch-switchBase': {
                                                    color: 'grey', // Button color when unchecked
                                                },
                                                '& .MuiSwitch-track': {
                                                    backgroundColor: 'lightgrey', // Background color when unchecked
                                                },
                                                // More customizations for size, shape, etc
                                            }}
                                        />

                                    </div> :
                                    <></>
                                }
                            </TabPanel>
                            <TabPanel value="3">Item Three</TabPanel>
                        </TabContext>
                    </Box>
                </div>
            )}
        </>
    );
}
