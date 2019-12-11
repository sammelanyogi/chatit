import React, { useState } from 'react';

export default function Message(props) {
    const [prop] = useState(props)
    return (
        <li>
            <div>
                {prop.name}:: {prop.text}
            </div>
        </li>
    );
}