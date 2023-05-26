import {FC, useState, useEffect} from 'react';
import { Octokit, App } from "octokit";

import Contributor from './Contributor';

import clstyle from '../syles/ContributorList.module.css'

const octokit = new Octokit({
    userAgent: "rolloutit_github/v1.0.0"
  })

  

interface ContributorListProps{
    text?: string;
    perPageLimit: number;
}

const ContributorList:FC<ContributorListProps> = (props)=>
{
    //Make Request
    async function getContributors(pageNumber: number) {
        try{
            
            let response = await octokit.request('GET /repos/{owner}/{repo}/contributors', {
                owner: 'angular',
                repo: 'angular',
                per_page: props.perPageLimit,
                page: pageNumber,
                headers: {
                'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            console.log(response)
        }
        catch(error: any){
            console.log(error.message)
        }
    }

    //const [items, setItems] = useState<Array<{}>>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    

    useEffect(() => {
        setIsLoading(true)
        getContributors(1)
        setIsLoading(false)        
      },[])
      
      
    return <>
        <h1>{props.text}</h1>
        <div className={clstyle.grid_list}>
            <Contributor text='Ez egy kártya'/>
            <Contributor text='Ez egy Másik'/>
            <Contributor text='Ez egy 3.'/>
            <Contributor text='Ez egy 4.'/>
        </div>
    </>
}

export default ContributorList;