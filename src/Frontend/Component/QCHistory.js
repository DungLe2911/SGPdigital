import { Typography } from "@mui/material";
import '../Style/QC.css'

const getDate = (date) => {
    const d = new Date(date);

    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();

    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // convert to 12-hour format

    return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
};


export default function QCHistory(props){

    return(
        <div>
            <Typography 
                component="span" 
                sx={{ fontFamily: "'Arvo', serif", fontSize: '1.5em', fontWeight: 500 }}>
                    Today's Submission
            </Typography>
            <ol className="submissionList">
                {props.submissionHistory.map((item,index)=>{
                    const machine = props.machineList.find(m => m._id === item.machine);
                    const machineName = machine ? machine.area+" area  - "+machine.name : "Unknown Machine";                    
                    return(
                        <div className="submissionItem">
                            <div><b>{getDate(item.createdAt)}</b></div>
                            <div><b>{machineName}</b></div>
                            <div>{item.name} - {item.size}</div>
                            {item.picker?<div>Picker: {item.picker}</div>:<></>}
                            {item.moisture?<div>Moisture: {item.moisture}</div>:<></>}
                            <div>-------------------------</div>
                            <div>Hard Shell: {item.hardShellCount? item.hardShellCount : 0 }</div>
                            <div>InnerShell Shell: {item.innerShellCount? item.innerShellCount : 0 }</div>
                            <div>Worm: {item.wormCount? item.wormCount : 0 }</div>
                            <div>Black Pieces: {item.blackPieces? item.blackPieces : 0 }</div>
                        </div>
                    )
                })}
            </ol>
        </div>
    )
}