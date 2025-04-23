import * as FaSolid from '@fortawesome/free-solid-svg-icons'
import * as FaRegular from '@fortawesome/free-regular-svg-icons'
import * as MuiSolid from '@mui/icons-material'


const menuItem = [
    {
        name:"QC",
        icon: FaRegular.faFile,
        type: "FontAwesome",
        path: "/qc"
    },
    {
        name: "Lookup",
        icon: FaSolid.faMagnifyingGlass,
        type: "FontAwesome", 
        path: "/lookup"
    },
    {
        name: "Manage",
        icon: FaSolid.faPeopleRoof,
        type: "FontAwesome",
        path: "/manage"
    },
    {
        name: "Report",
        icon: MuiSolid['Assessment'],
        type: "MUI",
        path: "/report"
    }
]

export {menuItem}