import React from 'react'
import Table from 'react-bootstrap/Table';

// Batch Requests Sample table:
// Take batchRequests array as the props and renders as the table

export const BatchRequestTable = ({ batchRequests }) => {

    const BatchRequestRow = (batchRequest, index) => {
        return (
            <tr key={index} className='even'>
                {/* <td> {index + 1} </td> */}
                <td>{batchRequest.client_number}</td>
                <td>{batchRequest.company_name}</td>
                <td>{batchRequest.registration_number}</td>
                <td>{batchRequest.country}</td>
                <td>{batchRequest.kyc_type}</td>
            </tr>
        )
    }

    const BatchRequestTable = batchRequests.map((batch, index) => BatchRequestRow(batch, index))

    const tableHeader = <thead className='bgvi'>
        <tr>
            {/* <th>#</th> */}
            <th>Client Number</th>
            <th>Company Name</th>
            <th>Registration Number</th>
            <th>Country</th>
            <th>KYC Type</th>
        </tr>
    </thead>

    return (
        <Table striped bordered hover>
            {tableHeader}
            <tbody>
                {BatchRequestTable}
            </tbody>
        </Table>
    )
}
