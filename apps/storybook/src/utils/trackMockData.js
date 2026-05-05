// Mock data for trackingData
export const mockTrackingData = 
  {
    "status": {
        "status": "WAITING_PICKUP",
        "statusDateTime": "2025-03-21T17:57:56.807",
        "statusType": "UD",
        "instructions": "Package details changed by shipper"
    },
    "slot": {},
    "referenceNo": "TR17MI42560023T589",
    "packageType": "Prepaid",
    "awb": "1221910110563",
    "hqStatus": "Manifested",
    "dispatchCenterId": "IND560025AAA",
    "productType": "B2C",
    "mcount": null,
    "covidZone": "G",
    "essential": true,
    "containmentArea": false,
    "destination": "Bangalore",
    "isAddressSpecific": false,
    "isPersonSpecific": false,
    "isInternational": false,
    "productName": "Consumables, Electronics:Box / Carton",
    "orderAmount": 1000,
    "clientName": "C2C Pilot Web",
    "displayName": "C2C Pilot Web",
    "consigneeAddress": "Shanthala Nagar, Ashok Nagar",
    "srcDestCxRemarks": {
        "xnsl_present": false
    },
    "deliveryDateText": "",
    "deliveryDate": "",
    "promiseDeliveryDate": "",
    "consignor": "Saveri Susarla",
    "consignee": "Saveri Susarla",
    "user_type": "both",
    "trackingStates": [
        {
            "label": "Pick up Pending",
            "date": "21 Mar 2025, Evening",
            "scans": [
                {
                    "scanDate": "21 Mar 2025, Evening",
                    "scanDateTime": "2025-03-21T17:57:38.526000",
                    "scanNslRemark": "Pickup request has been successfully created!",
                    "cityLocation": "",
                    "scanType": "UD",
                    "scan": "Manifested",
                    "tsUpdateNsl": false,
                    "setUndeliveredNsl": false
                }
            ],
            "scanDateTime": "2025-03-21T17:57:38.526000"
        },
        {
            "label": "In-transit",
            "date": "",
            "scans": null,
            "scanDateTime": ""
        },
        {
            "label": "Out for delivery",
            "date": "",
            "scans": null,
            "scanDateTime": ""
        },
        {
            "label": "Delivered",
            "date": "",
            "scans": null,
            "scanDateTime": ""
        }
    ],
    "clt": "delhivery_direct",
    "currentTrackIndex": 0,
    "currentFlow": "Forward",
    "amountText": "Click on Order Details for amount breakup.",
    "paymentTerms": "Prepaid",
    "pay_cod_charges": false,
    "showFEPhoneCTA": false,
    "fePhoneCTAText": "",
    "fePhoneMasked": "",
    "fePhoneErrMsg": "",
    "deliveryDate_v1": "To be updated post pick up",
    "deliveryDateText_v1": "Estimated Delivery Date",
    "selfHelp": [
        {
            "action_type": "Add Secondary Phone",
            "elements": {
                "title": "Add secondary phone number"
            }
        }
    ],
    "disruptions": {
        "disruption_image": "",
        "disruption_message": ""
    },
    "is_p2p": true,
    "deliveryLabel": "Pick up Pending",
    "showDeliveredFEPhoneCTA": false
}

export const mockTrackingDataOutForDelivery = {
    status: {
      status: "OUT_DELIVERY",
      statusDateTime: "2025-04-03T14:57:28.454",
      statusType: "UD",
      instructions: "Out for delivery",
    },
    slot: {
      stUtc: 1743651000,
      src: "DEFAULT",
      from: "09:00",
      to: "19:00",
      dsrc: "DEFAULT",
      date: "08/04/2025",
      srcApp: "PKG_UPDATE",
    },
    referenceNo: "T17436J7ID2F273621",
    packageType: "Prepaid",
    awb: "1221910111086",
    hqStatus: "Dispatched",
    dispatchCenterId: "IND400093AAA",
    productType: "B2C",
    mcount: null,
    covidZone: "G",
    essential: true,
    containmentArea: false,
    destination: "Mumbai",
    isAddressSpecific: false,
    isPersonSpecific: false,
    isInternational: false,
    productName: "Books \u0026 Documents:Envelope / Pouch",
    orderAmount: 500,
    clientName: "C2C Pilot Web",
    displayName: "C2C Pilot Web",
    consigneeAddress: "Test yellow , Hello",
    nextTrialDate: "2025-04-03T09:00:00",
    srcDestCxRemarks: {
      xnsl_present: false,
    },
    deliveryDateText: "Estimated Delivery Date",
    deliveryDate: "09 Apr 2025",
    promiseDeliveryDate: "2025-04-07T23:59:59",
    consignor: "Saveri Susarla",
    consignee: "Testing",
    user_type: "consignor",
    trackingStates: [
      {
        label: "Picked up",
        date: "03 Apr 2025, Afternoon",
        scans: null,
        scanDateTime: "2025-04-03T14:55:03.419000",
      },
      {
        label: "In-transit",
        date: "03 Apr 2025, Afternoon",
        scans: [
          {
            scanDate: "03 Apr 2025, Afternoon",
            scanDateTime: "2025-04-03T14:56:04.209000",
            scanNslRemark: "Shipment picked up from merchant",
            cityLocation: "Paratwada",
            scanType: "UD",
            scan: "In Transit",
            tsUpdateNsl: false,
            setUndeliveredNsl: false,
          },
          {
            scanDate: "03 Apr 2025, Afternoon",
            scanDateTime: "2025-04-03T14:56:54.098000",
            scanNslRemark: "Shipment arrived at Delhivery facility",
            cityLocation: "Paratwada",
            scanType: "UD",
            scan: "Pending",
            tsUpdateNsl: false,
            setUndeliveredNsl: false,
          },
        ],
        scanDateTime: "2025-04-03T14:56:54.098000",
      },
      {
        label: "Out for delivery",
        date: "03 Apr 2025, Afternoon",
        delayMessage: "There might be some delay.",
        scans: [
          {
            scanDate: "03 Apr 2025, Afternoon",
            scanDateTime: "2025-04-03T14:57:28.454000",
            scanNslRemark: "Our executive is out for delivery",
            cityLocation: "NA",
            scanType: "UD",
            scan: "Dispatched",
            tsUpdateNsl: false,
            setUndeliveredNsl: false,
          },
        ],
        scanDateTime: "2025-04-03T14:57:28.454000",
      },
      {
        label: "Delivered",
        date: "",
        scans: null,
        scanDateTime: "",
      },
    ],
    clt: "delhivery_direct",
    currentTrackIndex: 2,
    currentFlow: "Forward",
    amountText: "Click on Order Details for amount breakup.",
    paymentTerms: "Prepaid",
    pay_cod_charges: false,
    showFEPhoneCTA: true,
    fePhoneCTAText: "Call Delivery Executive",
    fePhoneMasked: "",
    fePhoneErrMsg: "",
    deliveryDate_v1: "Arriving today",
    disruptions: {
      disruption_image: "",
      disruption_message: "",
    },
    is_p2p: true,
    deliveryLabel: "Out for delivery",
    showDeliveredFEPhoneCTA: false,
  };

export const mockTrackingDataCancelled=   {
  "status": {
      "status": "NOT_PICKED",
      "statusDateTime": "2025-03-10T09:05:44.732",
      "statusType": "UD",
      "instructions": "Shipment not received from client"
  },
  "slot": {},
  "referenceNo": "T1741262HI3U6M1161",
  "packageType": "Prepaid",
  "awb": "1221910110062",
  "hqStatus": "Not Picked",
  "dispatchCenterId": "IND560025AAA",
  "productType": "B2C",
  "mcount": null,
  "covidZone": "G",
  "essential": true,
  "containmentArea": false,
  "destination": "Bangalore",
  "isAddressSpecific": false,
  "isPersonSpecific": false,
  "isInternational": false,
  "productName": "Books \u0026 Documents:Envelope / Pouch",
  "orderAmount": 500,
  "clientName": "C2C Pilot Web",
  "displayName": "C2C Pilot Web",
  "consigneeAddress": "Shanthala Nagar, Ashok Nagar",
  "srcDestCxRemarks": {
      "xnsl_present": false
  },
  "deliveryDateText": "",
  "deliveryDate": "",
  "promiseDeliveryDate": "",
  "consignor": "Saveri Susarla",
  "consignee": "Saveri Susarla",
  "user_type": "both",
  "trackingStates": [
      {
          "label": "Pick up Pending",
          "date": "06 Mar 2025, Evening",
          "scans": [
              {
                  "scanDate": "06 Mar 2025, Evening",
                  "scanDateTime": "2025-03-06T17:30:05.985000",
                  "scanNslRemark": "Pickup request has been successfully created!",
                  "cityLocation": "",
                  "scanType": "UD",
                  "scan": "Manifested",
                  "tsUpdateNsl": false,
                  "setUndeliveredNsl": false
              }
          ],
          "scanDateTime": "2025-03-06T17:30:05.985000"
      },
      {
          "label": "Canceled",
          "date": "10 Mar 2025, Morning",
          "scans": null,
          "scanDateTime": ""
      }
  ],
  "clt": "delhivery_direct",
  "currentTrackIndex": 1,
  "currentFlow": "Forward",
  "amountText": "Click on Order Details for amount breakup.",
  "paymentTerms": "Prepaid",
  "pay_cod_charges": false,
  "showFEPhoneCTA": false,
  "fePhoneCTAText": "",
  "fePhoneMasked": "",
  "fePhoneErrMsg": "",
  "deliveryDate_v1": "Not Applicable",
  "deliveryDateText_v1": "Estimated Date",
  "disruptions": {
      "disruption_image": "",
      "disruption_message": ""
  },
  "is_p2p": true,
  "deliveryLabel": "Canceled",
  "showDeliveredFEPhoneCTA": false
}
  