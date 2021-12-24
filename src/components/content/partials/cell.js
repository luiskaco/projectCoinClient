import React from 'react';

const TableCell = ({fname, status}) => {

    return ( 
        <>
            <tr>
                <th scope="row"></th>
                <td>{fname}</td>
                <td>2</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>{status}</td>
                <td>@mdo</td>
                <td>TO DO:</td>
            </tr>
        </>
     );
}
 
export default TableCell;