import { HeaderRecentList } from "./HeaderRecentList"
import { MainHeaderPills } from "./MainHeaderPills"

function MainHeader(){
    return(
        <>
        <MainHeaderPills />

        <HeaderRecentList />
        </>
    )
}

export {MainHeader}