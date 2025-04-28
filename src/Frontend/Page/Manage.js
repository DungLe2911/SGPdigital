import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import '../Style/Manage.css';
import { useState, useEffect } from 'react';
import ManageUser from '../Component/ManageUser.js';
import ManageMachine from '../Component/ManageMachine.js';
import { authCheck, getAllUser, getListArea, getListMachine } from '../Utils/request.js';
import ModalComponent from '../Component/ModalComponent.js';

export default function Manage() {
  const [curTab, setCurTab] = useState("1");
  const [width, setWidth] = useState(window.innerWidth);
  const [userList, setUserList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [machineList, setMachineList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = ()=> setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    const initializeData = async () => {
      try {
        const authResponse = await authCheck();
        if (!authResponse.data.isAuthenticated) {
          return;
        }
        const areaResponse = await getListArea();
        setAreaList(areaResponse.data);
        const machineResponse = await getListMachine();
        setMachineList(machineResponse.data.sort((a,b)=>{return a.name.localeCompare(b.name)}));
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };
    initializeData();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabChange = async (event, newTab) => {
    setCurTab(newTab);
    if (newTab === "1") {

    } else if (newTab === "2") {
      if (userList.length === 0) {
        try{
          const response = await getAllUser();
          setUserList(response.data);
        }catch(err){

        }
      }
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
                </TabList>
              </Box>
              <TabPanel value="1">
                <ManageMachine 
                  areaList={areaList}
                  machineList={machineList}
                  setMachineList={setMachineList}
                  openModal={openModal}
                />
              </TabPanel>
              <TabPanel value="2">
                <ManageUser
                  userList={userList}
                  machineList={machineList}
                  areaList={areaList}
                  setUserList={setUserList}
                />
              </TabPanel>
            </TabContext>
          </Box>
          <ModalComponent open={modalOpen} closeModal={closeModal}/>
        </div>
      )}
    </>
  );
}
