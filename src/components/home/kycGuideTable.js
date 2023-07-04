import React from 'react'
import Table from 'react-bootstrap/Table';

// Batch Requests Sample table:
// Take batchRequests array as the props and renders as the table

export const KycGuideTable = ({ batchRequests }) => {

    const BatchRequestRow = (kycGuide, index) => {
        return (
            <tr key={index} className='even'>
                <td> {index + 1} </td>
                <td>{kycGuide.kyc_type_name}</td>
                <td>{kycGuide.kyc_type}</td>
            </tr>
        )
    }

    const KYCGuideTable = batchRequests.map((batch, index) => BatchRequestRow(batch, index))

    const tableHeader = <thead className='bgvi'>
        <tr>
            <th>Id</th>
            <th>Kyc Type Name</th>
            <th>Kyc Type</th>
        </tr>
    </thead>

    return (
        <Table striped bordered hover>
            {tableHeader}
            <tbody>
                {KYCGuideTable}
            </tbody>
        </Table>
    )
}
