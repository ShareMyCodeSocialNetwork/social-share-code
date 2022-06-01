import CodeMirror from "@uiw/react-codemirror"
import "codemirror/theme/dracula.css"
import React, {useEffect, useState} from "react"
import CardHome from "../components/pages/CardHome";
import {Link} from "react-router-dom";
import AuthService from "../components/Auth/AuthService";
import {isEmpty} from "../components/utils/Utils";

const Home = () => {
    const [isConnected,setIsConnected] = useState(AuthService.getCurrentUser())
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
                    {
                        isEmpty(isConnected)  &&
                        <Link to="/register" style={{textDecoration:'none'}}>
                            <div className="button-home">Sign UP for free</div>
                        </Link>
                    }
                    {
                        !isEmpty(isConnected) &&
                        <Link to="/code/new" style={{textDecoration:'none'}}>
                            <div className="button-home">Start Coding</div>
                        </Link>
                    }
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