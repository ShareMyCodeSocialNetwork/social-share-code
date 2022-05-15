import React, {useState} from 'react';
import CardSearchCode from "../components/pages/CardSearchCode";

const Project = () => {
    const [arrayPostCode, setArrayPostCode] = useState([{"language":"Python","code":"print('hello world')","like":20,"comments":[],"view":1000,"editorName":"David-Henri arnaud"},{"language":"Python","code":"print('hello world')","like":20,"comments":[],"view":1000,"editorName":"David-Henri arnaud"},{"language":"Python","code":"print('hello world')","like":20,"comments":[],"view":1000,"editorName":"David-Henri arnaud"},{"language":"Python","code":"print('hello world')","like":20,"comments":[],"view":1000,"editorName":"David-Henri arnaud"},{"language":"Python","code":"print('hello world')","like":20,"comments":[],"view":1000,"editorName":"David-Henri arnaud"},{"language":"Python","code":"print('hello world')","like":20,"comments":[],"view":1000,"editorName":"David-Henri arnaud"},{"language":"Python","code":"print('hello world')","like":20,"comments":[],"view":1000,"editorName":"David-Henri arnaud"},{"language":"Python","code":"print('hello world')","like":20,"comments":[],"view":1000,"editorName":"David-Henri arnaud"}])

    return (
        <div className="view--project">
            <div className="container-project">
                {
                    arrayPostCode.map((value, index) =>
                        <div className="post-code" key={index}>
                            <CardSearchCode language={value.language} code={value.code} like={value.like} comments={value.comments} view={value.view} editorName={value.editorName}/>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Project;