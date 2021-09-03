import { SvgIcon, SvgIconProps } from "@material-ui/core";

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 23/08/2021
 * Description: Returns a Svg converted icon
 * Icon used made by Freepik (https://www.freepik.com) and was located and downloaded from Flaticon website (https://www.flaticon.com)
 */

//Creates svg icon of bullet point
function BulletPointIcon(props: SvgIconProps)
{
    return (
        <SvgIcon {...props} version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="24.000000pt" height="24.000000pt" viewBox="0 0 24.000000 24.000000"
            preserveAspectRatio="xMidYMid meet" style={{ fontSize : "small" }}>
        
            <g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)"
            fill="#000000" stroke="none">
            <path d="M84 233 c-12 -2 -34 -17 -50 -34 -23 -24 -28 -38 -28 -79 0 -43 5
            -55 31 -82 62 -61 162 -36 192 48 12 34 11 44 -2 76 -23 55 -82 84 -143 71z"/>
            </g>
        </SvgIcon>
    );
}

export default BulletPointIcon;