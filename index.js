import React from 'react';
import { render } from 'react-dom';
import { Browser as Router } from 'react-router-dom';


const store = configure()

render(
    <Route>
        <Root store = {store} />
    </Route>,
    document.getElementById('root')
)