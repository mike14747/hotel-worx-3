import React from 'react';
import SplitPane from 'react-split-pane';
import './style.css';
import Component1 from '../component1';
import Component2 from '../component2';

export default function splitScreen() {
    return (
        <div>
            <SplitPane
                split='vertical'
                minSize={33}
                defaultSize={parseInt(localStorage.getItem('splitPos'), 10)}
                onChange={(size) => localStorage.setItem('splitPos', size)}
            >
                <div>
                    <Component1 />
                </div>
                <div>
                    <Component2 />
                </div>
            </SplitPane>
        </div>
    );
}
