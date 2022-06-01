import React, {useState} from 'react';
import CardSearchCode from "../components/pages/CardSearchCode";
import {useParams} from "react-router-dom";
import {filter_array} from "../components/utils/Utils";

const Project = () => {

    const { filters } = useParams();

    const [arrayPostCode, setArrayPostCode] = useState([{"language":"Python","code":"print('hello world')","like":20,"comments":[],"view":1000,"editorName":"David-Henri arnaud"},{"language":"Python","code":"print('hello world')","like":20,"comments":[],"view":1000,"editorName":"David-Henri arnaud"},{"language":"Python","code":"print('hello world')","like":20,"comments":[],"view":1000,"editorName":"David-Henri arnaud"},{"language":"Python","code":"print('hello world')","like":20,"comments":[],"view":1000,"editorName":"David-Henri arnaud"},{"language":"Python","code":"print('hello world')","like":20,"comments":[],"view":1000,"editorName":"David-Henri arnaud"},{"language":"Python","code":"print('hello world')","like":20,"comments":[],"view":1000,"editorName":"David-Henri arnaud"},{"language":"Python","code":"print('hello world')","like":20,"comments":[],"view":1000,"editorName":"David-Henri arnaud"},{"language":"Js","code":"console.log('hello world')","like":20,"comments":[],"view":1000,"editorName":"David-Henri arnaud"},{"language":"Js","code":"console.log('hello world')","like":20,"comments":[],"view":1000,"editorName":"Henri "}])

    return (
        <div className="view--project">
            <div className="container-project">
                {
                    filter_array(filters,arrayPostCode).map((value, index) =>
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