import erc721 from '../abi/MyNFT.json';
import {getContract} from "./ContractUtil"
import {addressExamine} from "./TypeUtil";
import ErrorEnum from "./error/ErrorEnum";
const contractAddressDefault = '0x751Cb64c9299B602F2c3193Dc4F13307A87c65a0';
const contract =  await getERC721()

async function getERC721(){
   return  await getContract(contractAddressDefault,erc721.output.abi)
}
async function getErc721Balance(address) {
    if ( !addressExamine(address)) throw ErrorEnum.InvalidAddress.getError()
    let callback = await contract.balanceOf(address)
    return callback;
}
//授权函数调用
async function Approve(approveAddress,tokenId){
    if ( !addressExamine(approveAddress)) throw ErrorEnum.InvalidAddress.getError()
    return await contract.approve(approveAddress,tokenId)
}
//授权tokenId的地址
async function getApprove(tokenId){
    return await contract.getApproved(tokenId)
}
async function getNameServiceToCID(nameService){
    return await contract.getCID(nameService);
}

export {Approve,getErc721Balance,getApprove,getNameServiceToCID}
