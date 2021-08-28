import React from 'react';

export default class UnitInformationPage extends React.Component<any,any> {
    constructor(UnitProps: any) {
        super(UnitProps);
        this.state = {
            unitCode: "",
            unitDescr: "",
            unitName: "",
            unitCredits: "",
        };
    }

    componentDidMount() {
        const fetchUnitInfo = async() => {
            const unitCodePassedIn = this.props.unitCode;
            const response = await fetch('https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getunit?code='+unitCodePassedIn);
            const unitData = await response.json();
            let unitCreds = unitData[0].Credits;
            let code = unitData[0].UnitCode;
            let desc = unitData[0].Description;
            let name = unitData[0].Name;
            this.setState({
                unitCredits: unitCreds,
                unitCode: code,
                unitDescr: desc,
                unitName: name
            });
        }
        fetchUnitInfo();
    }

    render() {
        return (
            <div>
                <h1 className="header"> 
                    {this.state.unitName} - {this.state.unitCode}
                </h1>
                <div>
                    <p className="paragraph-text">
                        {this.state.unitDescr} 
                    </p>
                </div>
            </div>
        );
    }
}
