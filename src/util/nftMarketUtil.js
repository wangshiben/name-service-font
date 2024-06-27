import marketABI from '../abi/nftMarket.json';
import {getContract} from "./ContractUtil"
import {Approve} from "./erc721Util"
import { ethers } from 'ethers';

const contractAddressDefault = '0x737D6ABe6c9e5ab0725b5B308d0B31f6F13A6213';

const contract =  await getNftMarket()

async function getNftMarket(){
    return  await getContract(contractAddressDefault,marketABI.output.abi)
}

async function buyWithERC20(tokenId){
    return await contract.buy(tokenId)
}

async function buyWithETH(tokenId){
    let rate =parseFloat( await getRate());
    let ERC20Price = parseFloat(await getNFTPrice(tokenId))
    let PayValue =Math.floor( ERC20Price/rate)
    let overrides = {
        value: PayValue // 设置函数调用的以太币值
    };
    return await contract.buyNFT(tokenId,overrides)
}

async function getNFTPrice(tokenId){
    return await contract.getNFTPrice(tokenId);
}
async function buyErc20(tokenNum){
    // let rate =parseFloat(tokenNum);
    // let ERC20Price = parseFloat(await getNFTPrice(tokenId))
    // let PayValue =Math.floor( ERC20Price/rate)
    console.log( ethers.parseEther(tokenNum.toString()))
    let overrides = {
        value: ethers.parseEther(tokenNum.toString()), // 设置函数调用的以太币值
        gasLimit:ethers.parseEther("0.000000000001")
    };
    return await contract.buyErc20({...overrides})
}

async function changeNFTPrice(tokenId,newPrice){
    return await contract.changeNFTPrice(tokenId,newPrice)
}
async function listNFT(tokenId,Price){
    await Approve(contractAddressDefault,tokenId)
    return await contract.listNFT(tokenId,Price)
}
async function unListNFT(tokenId){
    return await contract.unlistNFT(tokenId)
}
async function getRate(){
    return await contract.Rate()
}
async function createNFT(nameService,ZID){
    return await contract.createNFT(nameService,ZID)
}
async function getNameServiceList(){
    return await contract.balanceOfToken()
}

async function updateZID(URI,ZID){
    return await contract.updateOwner(URI,ZID)
}

export {getNFTPrice,buyWithETH,buyWithERC20,changeNFTPrice,listNFT,unListNFT,getRate,buyErc20,createNFT,getNameServiceList,updateZID}
