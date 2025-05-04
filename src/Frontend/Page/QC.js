import { Box,  Tab  } from '@mui/material'
import '../Style/QC.css'
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useEffect, useState } from 'react';
import { authCheck, logUserOut } from '../Utils/request.js';
import QCForm from '../Component/QCForm.js';
import QCHistory from '../Component/QCHistory.js';
export default function QC() {
    const [curTab, setCurTab] = useState("1");
    const [machineList, setMachineList] = useState([]);
    const [edit, setEdit] = useState(false)
    const [submissionHistory, setSubmissionHistory] = useState([]);

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
                        <QCForm 
                            machineList={machineList}
                            edit={edit}
                            setEdit={setEdit}
                            submissionHistory={submissionHistory}
                            setSubmissionHistory={setSubmissionHistory}
                        />
                    </TabPanel>
                    <TabPanel value="2">
                        <QCHistory 
                            submissionHistory={submissionHistory}
                            machineList = {machineList}
                        />
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}