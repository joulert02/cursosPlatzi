import React from 'react';
import { sessionStorage, localStorage } from "./../state/utils/storage";
import useSessionState from "./useSessionState"

export default function useCoverageState(citys) {
    const { isLoggedUser,actualStorage } = useSessionState()
    const userData = actualStorage == 0 ? localStorage.getItem('userData') : sessionStorage.getItem('userData');
    const [isCoverage, setCoverage] = React.useState(true);

    React.useEffect(() => {
        if(userData && userData !== null && isLoggedUser){
            console.log("ENTRANDO AQu")
            const response = citys.filter(city => city.codigo == userData.mainCity).length > 0;
            setCoverage(response)
        }
    })
    

    return [isCoverage]
}