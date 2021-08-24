import React from 'react';
import { UnitProps } from "../types";


export default class InformationPage extends React.Component<UnitProps> {
    render() {
        console.log(this.props);
        return (
            <div>
                <h1 style={{display: 'flex',  justifyContent:'center'}}> 
                    {this.props.unitTitle}-{this.props.unitCode}
                </h1>
                <div>
                    <p style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
                        {this.props.unitText} 
                    </p>
                </div>
            </div>
        );
    }
}
