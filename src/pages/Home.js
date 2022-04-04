import CodeMirror from "@uiw/react-codemirror"
import "codemirror/theme/material-darker.css"
import {useEffect, useState} from "react"
import axios from "axios";

const Home = () => {
    const [codeTest, setCodeTest] =  useState(``)
    const getCodeTest = (codetitle) => {
        const article = { code: codetitle };
        axios.post('http://localhost:3001/excution/python', article)
            .then(response => console.log(response.data.response));
    }


    return(
        <div className='view--home'>
            <div>HOME</div>
            <div>
                <CodeMirror
                    options={{theme : "material-darker", mode: "python"}}
                    value=""
                    height="400px"
                    onChange={(editor, viewUpdate) => {
                        console.log('value:', editor.getValue());
                        setCodeTest(editor.getValue())
                    }}/>
            </div>

            <button style={{backgroundColor: "#FFFBED"}} onClick={() => getCodeTest(codeTest)}> excute </button>

        </div>
    )
}

export default Home;