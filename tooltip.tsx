import Doc from "../../layouts/Doc";
import { Text, typography } from '@snowytime/snowyui';
import styled from 'styled-components';
import React from 'react';

const Wrap = styled.div`
    width: 100%;
    height: auto;
    margin: 20px 0 0 0;
`;

const Truncated = styled.div`
    width: ${ props => props.truncated ? '300px' : 'auto' };
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Button = styled.button`
    background: rgba(247, 131, 111, 1);
    color: white;
    padding: 10px 30px;
    border-radius: 100px;
    border: none;
    outline: none;
    font-family: ${typography.type.sans};
    font-weight: 600;
    font-size: 15px;
    margin-top: 40px;
`;
const Parent = styled.div``;

const Tooltipper = styled.div`
    background: black;
    color: white;
    font-size: 13px;
    font-weight: 500;
    height: auto;
    padding: 4px 10px;
    border-radius: 4px;
    position: absolute;
    left: 0;
    top: -20px;
`;

const Truncer = ({ ...props }) => {
    const refer = React.useRef(null);
    const [ show, setShow ] = React.useState<boolean>(false);

    const checkTrunc = () => {
        const target = refer.current;
        if (target.offsetWidth < target.scrollWidth) {
            setShow(true);
            return;
        };
    };

    return (
        <Parent onMouseEnter = { () => checkTrunc() } onMouseLeave = { () => setShow(false) }>
        { show ? <Tooltipper>{ refer.current.textContent }</Tooltipper> : '' }
        <Truncated ref = { refer } truncated = { props.truncated }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed lectus at eros commodo sagittis. Aliquam laoreet consectetur justo, eget volutpat lacus varius id.</Truncated>
        </Parent>
    )
};

export default function Tooltip() {
    const [ compress, setCompress ] = React.useState<boolean>(false);
    return (
        <Doc>
            <Text type = 'h3' family = { typography.type.jade}>Tuncation & Tooltip</Text>
            <Wrap>
                <Truncer truncated = { compress } />
                <Button onClick = { () => setCompress(!compress) }>{ compress ? 'full' : 'truncate' }</Button>
            </Wrap>
        </Doc>
    )
};
