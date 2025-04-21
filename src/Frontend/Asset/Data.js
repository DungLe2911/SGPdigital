import * as FaSolid from '@fortawesome/free-solid-svg-icons'
import * as FaRegular from '@fortawesome/free-regular-svg-icons'
import * as MuiSolid from '@mui/icons-material'


const menuItem = [
    {
        name:"QC",
        icon: FaRegular.faFile,
        type: "FontAwesome",
        path: "/QC"
    },
    {
        name: "Lookup",
        icon: FaSolid.faMagnifyingGlass,
        type: "FontAwesome", 
        path: "/Lookup"
    },
    {
        name: "Manage",
        icon: FaSolid.faPeopleRoof,
        type: "FontAwesome",
        path: "/Manage"
    },
    {
        name: "Report",
        icon: MuiSolid['Assessment'],
        type: "MUI",
        path: "/Report"
    }
]

export {menuItem}