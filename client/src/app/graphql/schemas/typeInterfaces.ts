export type Repair = {
    _id: string,
    radioID: string,
    radioMake: string,
    radioSerial: string,
    radioOrg: string,
    radioLocation: string,
    reportedBy: string,
    endUserPO: string,
    raaPO: string,
    repairTag: number,
    repairStatus: string,
    dateRepairAdded: string,
    dateSentEuRaa: string,
    dateRecEuRaa: string,
    dateSentRaaTech: string,
    dateRecTechRaa: string,
    dateSentRaaEu: string,
    techInvNum: string,
    raaInvNum: string,
    symptoms: string[],
    testFreq: string,
    incRxSens: string,
    incFreqErr: string,
    incMod: string,
    incPowerOut: string,
    outRxSens: string,
    outFreqErr: string,
    outMod: string,
    outPowerOut: string,
    accessories: string[],
    workPerformed: string[],
    repHours: number,
    partsUsed: string[],
    remarks: string,
};

export type Radio = {
    _id: string,
    orgName: string,
    locationName: string,
    datePurchased: string,
    dateEntered: string,
    inventoryNumber: string,
    make: string,
    model: string,
    progChannels: string,
    notes: string[],
    serialNumber: string,
    serviceRecord: Repair[],
    warranty: string,
    refurb: boolean,
    radioType: string
};

export type User = {
    _id: string,
    username: string,
    email: string,
    password: string,
    accessLevel: string,
    orgName: string,
    userLocation: string,
};

export type AuthInfo = {
    username: string,
    orgName: string,
    accessLevel: string,
    userLocation: string,
};

export type StoredUser = {
    _id: string,
    username: string,
    accessLevel: string,
    orgName: string,
}

export type Organization = {
    _id: string,
    orgName: string,
    locations: Location[],
    // radios: Radio[],
    users: User[],
};

export type Location = {
    _id: string,
    locationName: string,
    orgName: string,
    street: string,
    suite: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    phone: string,
    contactEmail: string,
    primaryContact: string,
    radios: Radio[]
}

export type Auth = {
    token: string,
    user: User
};

export type LoginResults = {
    token: Auth,
    user: User
};

export type LoginVariables = {
    email: string,
    password: string
};

export type LimitedRecord = {
    _id: string,
    dateReceived: string,
}

export type AdminRadioFields = {
    _id: string,
    orgName: string,
    locationName: string,
    datePurchased: string,
    dateEntered: string,
    inventoryNumber: string,
    make: string,
    model: string,
    progChanels: string,
    notes: string [],
    serialNumber: string,
    serviceRecord: LimitedRecord[],
    warranty: string,
    refurb: string,
    radioType: string
}

export type RepairFormFields = {
    radioID: string
    radioMake: string
    radioSerial: string
    radioOrg: string
    radioLocation: string
    reportedBy: string
    endUserPO: string
    raaPO: string
    repairTag?: number
    repairStatus: string
    dateRepairAdded: Date | null
    dateSentEuRaa: Date | null
    dateRecEuRaa: Date | null
    dateSentRaaTech: Date | null
    dateRecTechRaa: Date | null
    dateSentRaaEu: Date | null
    techInvNum: string
    raaInvNum: string
    symptoms: string[]
    testFreq: string
    incRxSens: string
    incFreqErr: string
    incMod: string
    incPowerOut: string
    outRxSens: string
    outFreqErr: string
    outMod: string
    outPowerOut: string
    accessories: string[]
    workPerformed: string[]
    repHours: number
    partsUsed: string[]
    remarks: string
}

export type UpdateRepairFields = {
    radioID?: string
    radioMake?: string
    radioSerial?: string
    radioOrg?: string
    radioLocation?: string
    reportedBy?: string
    endUserPO?: string
    raaPO?: string
    repairTag?: number
    repairStatus?: string
    dateRepairAdded?: string
    dateSentEuRaa?: string
    dateRecEuRaa?: string
    dateSentRaaTech?: string
    dateRecTechRaa?: string
    dateSentRaaEu?: string
    techInvNum?: string
    raaInvNum?: string
    symptoms?: string[]
    testFreq?: string
    incRxSens?: string
    incFreqErr?: string
    incMod?: string
    incPowerOut?: string
    outRxSens?: string
    outFreqErr?: string
    outMod?: string
    outPowerOut?: string
    accessories?: string[]
    workPerformed?: string[]
    repHours?: number
    partsUsed?: string[]
    remarks?: string
}

export type UpdateRadioFields = {
    orgName?: string,
    locationName?: string,
    datePurchased?: Date,
    dateEntered?: Date,
    inventoryNumber?: string,
    make?: string,
    model?: string,
    progChannels?: string,
    notes?: string[],
    serialNumber?: string,
    warranty?: Date,
    refurb?: boolean,
    radioType?: string    
}

export type UpdateUserFields = {
    username?: string,
    email?: string,
    accessLevel?: string,
    orgName?: string,
    userLocation?: string
}

export type UpdateLocationFields = {
    locationName?: string,
    orgName?: string,
    street?: string,
    suite?: string,
    city?: string,
    state?: string,
    zip?: string,
    country?: string,
    phone?: string,
    contactEmail?: string,
    primaryContact?: string,
}

export type UpdateOrgFields = {
    orgName?: string
}

export type TableSearchParams = {
    queryType: string,
    queryParams: string,
}

export type statusType = 'pending' | 'loading' | 'error' | 'success';

export type accessLevels = 'admin' | 'user' | 'tech' | null;

export type InvoiceTextAttributes = {
    make: string,
    model: string,
    serialNumber: string,
    repairTag: number,
    workPerformed: string[]
}

export type PoTextAttributes = {
    make: string,
    model: string,
    serialNumber: string,
    accessories: string[],
    repairTag: number,
    orgName: string,
    locationName: string
}


