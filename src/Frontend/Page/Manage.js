import { Autocomplete, Box, Tab, TextField } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import '../Style/Manage.css';
import { useState, useEffect } from 'react';

export default function Manage() {
    const [curTab, setCurTab] = useState("1");
    const [width, setWidth] = useState(window.innerWidth);
    const [userList, setUserList] = useState([]);

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
            const temp = [
                {
                    _id: "68043fd2629817501c35862a",
                    username: "rle",
                    role: "admin",
                    machine: "Picking",
                    firstName: "Dung",
                    lastName: "Le",
                    active: false,
                },
                {
                    _id: "6807a82350b34c6f38ae3227",
                    username: "dwade",
                    role: "admin",
                    machine: "Picking",
                    firstName: "Daniel",
                    lastName: "Wade",
                    active: true,
                },
                {
                    _id: "6807e14c50b34c6f38ae3228",
                    username: "jcruz",
                    role: "QC",
                    machine: "picking",
                    firstName: "Jacinto",
                    lastName: "Cruz",
                    active: false,
                },
            ];
            setUserList(temp);
        } else {

        }
    };


    const handleInputChange = (event, change) => {

    }

    document.addEventListener('keydown', function(e){
        // if(e.key === 'Enter'){
        //     if()
        // }
    })
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
                            <TabPanel value="1">Tab 1</TabPanel>
                            <TabPanel value="2">
                                <Autocomplete
                                    disablePortal
                                    options={userList.sort((a, b) => -b.firstName.localeCompare(a.firstName))}
                                    groupBy={(option) => option.firstName.charAt(0).toUpperCase()}
                                    autoHighlight
                                    getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                                    renderOption={(props, option) => {
                                        const { key, ...optionProps } = props;
                                        return (
                                            <Box
                                                key={key}
                                                component="li"
                                                {...optionProps}
                                            >
                                                {option.firstName} {option.lastName}
                                            </Box>
                                        );
                                    }}
                                    renderInput={(params) => (
                                        <TextField

                                            onChange={handleInputChange}
                                            {...params}
                                            label="Choose a user to update"
                                            autoComplete="new-password"
                                        />
                                    )}
                                />
                                <div className='manageUserDivider'>OR</div>
                            </TabPanel>
                            <TabPanel value="3">Item Three</TabPanel>
                        </TabContext>
                    </Box>
                </div>
            )}
        </>
    );
}
