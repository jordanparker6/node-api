export interface IWorkLoad {
  meterCat: string,
  os: string,
  licenceModelAWS: string,
  licenceModelAzure: string,
  serverTenancy: string,
  resType: string,
  family: string,
  vCPU: string,
  vRAM: string
}

export interface ISKU {
  meterCat: string,
  os: string,
  licenceModelAWS: string,
  licenceModelAzure: string,
  serverTenancy: string,
  resType: string,
  AWSInstanceName: string,
  AzureInstanceName: string
}

export interface ICosts {
  AWSSKU: string,
  AzureSKU: string
}

export interface IUser {
  _id: string;
  email?: string
}