import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import React, { Component } from 'react'
import reactDom from 'react-dom';


export default async function App() {
  let launchPast
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  });
  
  launchPast = await client
    .query({
      query: gql`
      query name {
        launchesPast(limit: 10){
          mission_name
        links {
          flickr_images
          mission_patch_small
        }
        rocket {
          rocket_name
        }
        launch_date_utc
  }
  }
      `
    })
    console.log(launchPast.data.launchesPast)
    
    return (
      <h1>TEst</h1>
    )
}

 