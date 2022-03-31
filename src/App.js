import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";
import React, { useState } from 'react'
import moment from 'moment';
import pageNotFound from './assets/notfound.png'
import loadingIcon from './assets/revolvingrocket.gif'
const QUERY = gql`
query name {
  launchesPast{
    mission_name
  links {
    flickr_images
    mission_patch_small
  }
  rocket {
    rocket_name
  }
  launch_success
  launch_date_utc
}
}
`

export default function App() {
  const [missions, getMissions] = useState([])
  const [loading, setLoading] = useState(true)
  let response
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  });
  
  response = client
    .query({
      query: QUERY
    }).then((result) => {
        console.log(result)
        setLoading(false)
        getMissions(result)
    }).catch((error)=> {
      console.log(error)
    })

    return (
     <>
       {loading ? <div><img className='loading' src={loadingIcon}></img></div>:
       <div className='MainDiv'>
       <div className='DataView'> 
       {missions?.data?.launchesPast.map((launchPost) => (
        <table className='Column' key={launchPost.mission_name}>
             <tr className='border-bottom details'>
               <td width="20%">{launchPost.links.mission_patch_small != null ? <img className='missionPoster' src={launchPost.links.mission_patch_small}></img> : <img className='missionPoster' src={pageNotFound}></img>}</td>
               <td className='description' width="70%">
                <div className='missionName'>{launchPost.mission_name}</div> 
                <div className='sub-details'>Rocket: {launchPost.rocket.rocket_name}</div> 
                <div className='launchedAgo'>launched {moment(launchPost.launch_date_utc).fromNow()}</div>
                </td>
                <td  width="10%">{launchPost.launch_success ? <div className='success'>Success</div> : <div className='failure'>Failure</div>}</td> 
             </tr>
        </table>
      ))}
      </div>
      </div>
    }
     </>
    )

}

 