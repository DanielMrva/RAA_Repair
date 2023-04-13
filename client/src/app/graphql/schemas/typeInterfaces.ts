export type Repair = {
    _id: string,
    radioSerial: string
    dateReceived: string
    endUserPO: string
    raaPO: string
    repairTag: string
    dateSentTech: string
    dateRecTech: string
    dateSentEU: string
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
};

export type Radio = {
    _id: string,
    orgName: string,
    location: string,
    dateSold: string,
    dateEntered: string,
    inventoryNumber: string,
    make: string,
    model: string,
    progChannels: string,
    notes: string[],
    serialNumber: string,
    serviceRecord: Repair[],
    warranty: string,
};

export type User = {
    _id: string,
    username: string,
    email: string,
    password: string,
    accessLevel: string,
    orgName: string,
};

export type Organization = {
    _id: string,
    orgName: string,
    radios: Radio[],
    users: User[],
};

export type Auth = {
    token: string,
    user: User
};

export type LoginResults = {
    token: Auth,
    user: User
};

export type LoginVariables = {
    username: string,
    password: string
};