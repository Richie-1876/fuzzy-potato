import React from 'react';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:3003'
}

class NewForm extends React.Component{
    render(){
        return(
            <div></div>
        )
    }

}