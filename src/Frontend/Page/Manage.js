import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import '../Style/Manage.css';
import { useState, useEffect } from 'react';
import ManageUser from '../Component/ManageUser.js';
import ManageMachine from '../Component/ManageMachine.js';

export default function Manage() {
    const [curTab, setCurTab] = useState("1");
    const [width, setWidth] = useState(window.innerWidth);
    const [userList, setUserList] = useState([]);
    const [areaList, setAreaList] = useState([]);
    const [machineList, setMachineList] = useState([]);

    // Optional: Handle window resizing
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        const areaMockData = [
            { _id: "60d21b4667d0d8992e610c1a", type: "Picking" },
            { _id: "60d21b4667d0d8992e610c1b", type: "Machine" },
            { _id: "60d21b4667d0d8992e610c1c", type: "Sample" }
          ];
        setAreaList(areaMockData);
        
        const machineMockData = [
            // Picking Lines (8 lines)
            { _id: "60d21b4667d0d8992e610c1d", name: "Picking Line 1", area: "60d21b4667d0d8992e610c1a" },
            { _id: "60d21b4667d0d8992e610c1e", name: "Picking Line 2", area: "60d21b4667d0d8992e610c1a" },
            { _id: "60d21b4667d0d8992e610c1f", name: "Picking Line 3", area: "60d21b4667d0d8992e610c1a" },
            { _id: "60d21b4667d0d8992e610c20", name: "Picking Line 4", area: "60d21b4667d0d8992e610c1a" },
            { _id: "60d21b4667d0d8992e610c21", name: "Picking Line 5", area: "60d21b4667d0d8992e610c1a" },
            { _id: "60d21b4667d0d8992e610c22", name: "Picking Line 6", area: "60d21b4667d0d8992e610c1a" },
            { _id: "60d21b4667d0d8992e610c23", name: "Picking Line 7", area: "60d21b4667d0d8992e610c1a" },
            { _id: "60d21b4667d0d8992e610c24", name: "Picking Line 8", area: "60d21b4667d0d8992e610c1a" },
            
            // Satake 1-5
            { _id: "60d21b4667d0d8992e610c25", name: "Satake 1", area: "60d21b4667d0d8992e610c1b", groupType: "Satake" },
            { _id: "60d21b4667d0d8992e610c26", name: "Satake 2", area: "60d21b4667d0d8992e610c1b", groupType: "Satake" },
            { _id: "60d21b4667d0d8992e610c27", name: "Satake 3", area: "60d21b4667d0d8992e610c1b", groupType: "Satake" },
            { _id: "60d21b4667d0d8992e610c28", name: "Satake 4", area: "60d21b4667d0d8992e610c1b", groupType: "Satake" },
            { _id: "60d21b4667d0d8992e610c29", name: "Satake 5", area: "60d21b4667d0d8992e610c1b", groupType: "Satake" },
            
            // Buhler 1-2
            { _id: "60d21b4667d0d8992e610c2a", name: "Buhler 1", area: "60d21b4667d0d8992e610c1b", groupType: "Buhler" },
            { _id: "60d21b4667d0d8992e610c2b", name: "Buhler 2", area: "60d21b4667d0d8992e610c1b", groupType: "Buhler" },
            
            // LMC 1-4
            { _id: "60d21b4667d0d8992e610c2c", name: "LMC 1", area: "60d21b4667d0d8992e610c1b", groupType: "LMC" },
            { _id: "60d21b4667d0d8992e610c2d", name: "LMC 2", area: "60d21b4667d0d8992e610c1b", groupType: "LMC" },
            { _id: "60d21b4667d0d8992e610c2e", name: "LMC 3", area: "60d21b4667d0d8992e610c1b", groupType: "LMC" },
            { _id: "60d21b4667d0d8992e610c2f", name: "LMC 4", area: "60d21b4667d0d8992e610c1b", groupType: "LMC" },
            
            // Best 1
            { _id: "60d21b4667d0d8992e610c30", name: "Best 1", area: "60d21b4667d0d8992e610c1b", groupType: "Best" }
          ];
        setMachineList(machineMockData);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleTabChange = (event, newTab) => {
        setCurTab(newTab);
        if (newTab === "1") {
            
        } else if (newTab === "2") {
            //need pulling list of user later
            const temp = [
                {
                  _id: "60d21b4667d0d8992e610c85",
                  username: "jsmith42",
                  firstName: "John",
                  lastName: "Smith",
                  role: "QC",
                  shift: 1,
                  assignedMachine: ["60d21b4667d0d8992e610c1d", "60d21b4667d0d8992e610c25", "60d21b4667d0d8992e610c2c"],
                  active: true
                },
                {
                  _id: "60d21b4667d0d8992e610c86",
                  username: "mjohnson85",
                  firstName: "Maria",
                  lastName: "Johnson",
                  role: "Supervisor",
                  shift: 2,
                  assignedMachine: ["60d21b4667d0d8992e610c1e", "60d21b4667d0d8992e610c26", "60d21b4667d0d8992e610c2a", "60d21b4667d0d8992e610c2d", "60d21b4667d0d8992e610c30"],
                  active: true
                },
                {
                  _id: "60d21b4667d0d8992e610c87",
                  username: "agarcia123",
                  firstName: "Alex",
                  lastName: "Garcia",
                  role: "Admin",
                  shift: 3,
                  assignedMachine: [],
                  active: false
                },
                {
                  _id: "60d21b4667d0d8992e610c88",
                  username: "rwilliams",
                  firstName: "Robert",
                  lastName: "Williams",
                  role: "Operator",
                  shift: 1,
                  assignedMachine: ["60d21b4667d0d8992e610c1f", "60d21b4667d0d8992e610c27"],
                  active: true
                },
                {
                  _id: "60d21b4667d0d8992e610c89",
                  username: "ljones",
                  firstName: "Lisa",
                  lastName: "Jones",
                  role: "QC",
                  shift: 2,
                  assignedMachine: ["60d21b4667d0d8992e610c20", "60d21b4667d0d8992e610c28", "60d21b4667d0d8992e610c2b", "60d21b4667d0d8992e610c2e"],
                  active: true
                },
                {
                  _id: "60d21b4667d0d8992e610c8a",
                  username: "mbrown",
                  firstName: "Michael",
                  lastName: "Brown",
                  role: "Technician",
                  shift: 3,
                  assignedMachine: ["60d21b4667d0d8992e610c21", "60d21b4667d0d8992e610c22", "60d21b4667d0d8992e610c23", "60d21b4667d0d8992e610c29", "60d21b4667d0d8992e610c2f"],
                  active: true
                },
                {
                  _id: "60d21b4667d0d8992e610c8b",
                  username: "dlee",
                  firstName: "David",
                  lastName: "Lee",
                  role: "Supervisor",
                  shift: 1,
                  assignedMachine: ["60d21b4667d0d8992e610c24", "60d21b4667d0d8992e610c1d", "60d21b4667d0d8992e610c2a"],
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
                                <ManageMachine />
                            </TabPanel>
                            <TabPanel value="2">
                                <ManageUser 
                                    userList={userList}
                                    machineList={machineList}
                                    areaList={areaList}
                                    setUserList={setUserList}
                                />
                            </TabPanel>
                            <TabPanel value="3">Item Three</TabPanel>
                        </TabContext>
                    </Box>
                </div>
            )}
        </>
    );
}
