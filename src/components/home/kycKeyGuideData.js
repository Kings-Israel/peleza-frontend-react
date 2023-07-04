import React from "react";

export const kycColumns = [
    {
        name: "KYC Type",
        selector: "kyc_type",
        sortable: true,
    },
    {
        name: "KYC Type Name",
        selector: "kyc_type_name",
        sortable: true,
        cell: d => <span>{d.genres.join(", ")}</span>
    },
];

export const kycData = [
    {
        id: 1,
        kyc_type: "CO",
        kyc_type_name: ["Company"],
    },
    {
        id: 2,
        kyc_type: "BN",
        kyc_type_name: ["Business"],
    },
    {
        id: 3,
        kyc_type: "SOC",
        kyc_type_name: ["Societies"],
    },
    {
        id: 4,
        kyc_type: "CBO",
        kyc_type_name: ["Community Based Organisation"],
    },
    {
        id: 5,
        kyc_type: "TR",
        kyc_type_name: ["TrustS"],
    },
    {
        id: 6,
        kyc_type: "ICO",
        kyc_type_name: ["International Company"],
    },
    {
        id: 7,
        kyc_type: "SACCO",
        kyc_type_name: ["Cooperative SACCO"],
    },
    {
        id: 8,
        kyc_type: "LLP",
        kyc_type_name: ["Limited Liability Patnerships"],
    },
    {
        id: 9,
        kyc_type: "CLG",
        kyc_type_name: ["Company Limited By Guarantee"],
    },
    {
        id: 10,
        kyc_type: "NGO",
        kyc_type_name: ["NGO Search"],
    },

];