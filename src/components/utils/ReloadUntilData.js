import {isEmpty} from "./Utils";
import {Redirect} from "react-router-dom";

const ReloadUntilData = ({data}) => {

    window.addEventListener('popstate', function (event) {
        if(isEmpty(data)){
            window.location.reload()
            setTimeout(() => {
                return(
                    <Redirect to="/404"/>
                )
            },2000)
        }

    });
};

export default ReloadUntilData;