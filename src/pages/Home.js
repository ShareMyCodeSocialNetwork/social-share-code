import CodeMirror from "@uiw/react-codemirror"
import "codemirror/theme/dracula.css"
import {useEffect, useState} from "react"
import axios from "axios";
import CardHome from "../components/pages/CardHome";

/*
* const [codeTest, setCodeTest] =  useState(``)
    const getCodeTest = (codetitle) => {
        const article = { code: codetitle };
        axios.post('http://localhost:3001/excution/python', article)
            .then(response => console.log(response.data.response));
    }
* <div>
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

* */

const Home = () => {
    const [codeTest, setCodeTest] =  useState(`\n def words_count(phrase):\t\t \t\t   \t\t\t \t  \t   
    prec = ' '\t\t \t\t   \t\t\t \t  \t   
    phrase_min = phrase.lower()\t\t \t\t   \t\t\t \t  \t   
    nb_mot = 0\t\t \t\t   \t\t\t \t  \t   
    for char in phrase_min:\t\t \t\t   \t\t\t \t  \t   
        nb_mot += int(prec == ' ' or prec == '.' and char != ' ' and char!=',')\t\t \t\t   
        prec = char\t\t \t\t   \t\t\t \t  \t   
        debug(char)\t\t \t\t   \t\t\t \t  \t   
    return nb_mot\t\t \t\t   \t\t\t \t  \t   `)
    return(
        <div className='view--home'>
            <div className="header-home">
                <div className="left-part-home">
                    <div className="first-title-home">The best place to build, test, and discover Back-end code.</div>
                    <div className="subtitle-home">CodeBack is a social development environment for Back-end developers. </div>
                    <div className="button-home">Sign UP for free</div>
                </div>
                <div className="right-part-home">
                    <div className="right-part-background"/>
                    <div className="codemirror">
                        <CodeMirror
                            options={{theme : "dracula", mode: "python"}}
                            value={codeTest}
                            height="400px"
                            onChange={(editor, viewUpdate) => {
                                console.log('value:', editor.getValue());

                            }}/>
                    </div>
                </div>
            </div>
            <div className="body-home">
                <CardHome logo={"/assets/logo/lamp.svg"} firstText={"Build & Test"} lastText={"Get work done quicker by building out entire projects or isolating code to test features and animations. Want to keep it all under wraps?"} button={"Try the editors"} link={"/code"} />
                <CardHome logo={"/assets/logo/discover.svg"} firstText={"Learn & Discover"} lastText={"Get work done quicker by building out entire projects or isolating code to test features and animations. Want to keep it all under wraps?"} button={"Search and discovery"} link={"/project"} />
                <CardHome logo={"/assets/logo/share.svg"} firstText={"Share Your Work"} lastText={"Get work done quicker by building out entire projects or isolating code to test features and animations. Want to keep it all under wraps?"} button={"Share and following"} link={"/project"} />
            </div>
        </div>
    )
}

export default Home;