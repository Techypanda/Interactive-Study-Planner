import React from 'react';
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { MajorProps, DefaultProps } from "../../types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from 'react';

function ViewUnit(props: DefaultProps){

    const history = useHistory();
    const { id } = useParams<{ id: string }>(); 

    const base = [{Description : "", Name : "", UnitCreds: "", UnitCode: ""}]
	const [unitData, setUnitData] = useState(base);
    console.log('hi');
    console.log(id);
	const getUnitData = () => {
		axios.get('https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getunit?code='+id)
				.then((response) => {
                    console.log(response);
					setUnitData(response.data);
				})
	}
	useEffect(() => {
		getUnitData();
	  }, []);


    return( 
            <div>
                <h1 className="header"> 
                    <Typography style={{textTransform: 'capitalize'}} variant="h3">{unitData[0].Name} - {unitData[0].UnitCode} </Typography>
                </h1>
                <div>
                    <p className="paragraph-text">
                        <Typography variant="h6">{unitData[0].Description} </Typography>
                    </p>
                </div>
            </div>
    );
}

export default styled(ViewUnit)`
.header {
    max-height: 100px;
    overflow-y: scroll;
}
`;