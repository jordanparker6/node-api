import { Service, Inject } from 'typedi';
import { IWorkLoad, ISKU, ICosts } from '../interfaces';

@Service()
export default class CloudCompareService {
    constructor(
        @Inject('db') private db,
        // @Inject('firebase') private firebase
    ) { }


    // Get Instance Names Query
    // COMMENT HERE

    public async getInstanceNames({
        meterCat,
        os,
        licenceModelAWS,
        licenceModelAzure,
        serverTenancy,
        resType,
        family,
        vCPU,
        vRAM
    }: IWorkLoad) {

        const result = await this.db.query(
            `
            SELECT * FROM getInstanceName_func($1, $2, $3, $4, $5, $6, $7, $8, $9 );
            `
            , [meterCat, os, licenceModelAWS, licenceModelAzure, serverTenancy, resType, family, vCPU, vRAM])
        console.log(result)
        return result
    }

    // Get SKU Query
    // COMMENT HERE

    public async getSKU({
        meterCat,
        os,
        licenceModelAWS,
        licenceModelAzure,
        serverTenancy,
        resType,
        AWSInstanceName,
        AzureInstanceName,
    }: ISKU) {

        const result = await this.db.query(
            `
            SELECT * FROM getSKUs_func($1, $2, $3, $4, $5, $6, $7, $8);
            `
            , [meterCat, os, licenceModelAWS, licenceModelAzure, serverTenancy, resType, AWSInstanceName, AzureInstanceName])
        console.log(result)
        return result
    }

    // Get Costs Query
    // COMMENT HERE

    public async getCosts({
        AWSSKU,
        AzureSKU,
    }: ICosts) {

        const result = await this.db.query(
            `
            SELECT * FROM getcosts_func($1, $2);
            `
            , [AWSSKU, AzureSKU])
        console.log(result)
        return result
    }

    public async test() {
        const result = await this.db.query(`
            SELECT * FROM "tbl-cct-public"
            LIMIT 1;
        `)
        return result
    }
}