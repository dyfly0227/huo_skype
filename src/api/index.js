import { ethers } from "ethers";
import { message } from "ant-design-vue";

export async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const res = await ethereum.request({ method: "eth_requestAccounts" });
      return res[0];
      // const balance = await ethereum.request({
      //   method: "eth_getBalance",
      //   params: [res[0], "latest"],
      //   id: 1,
      // });
      // console.log(balance, 2);
    } catch (error) {
      alert(error);
      return "";
    }
    // const accounts = await ethereum.request({ method: "eth_accounts" });
  } else {
    alert("Please install MetaMask");
    return "";
  }
}

export async function execute(userName, maskAddress) {
  if (typeof window.ethereum !== "undefined") {
    const contractAddress = "0x892485fef3b6aef495c8ea7de9ec365d48d906b5";
    const abi = [
      {
        inputs: [
          { internalType: "address", name: "pubKey1", type: "address" },
          { internalType: "address", name: "pubKey2", type: "address" },
        ],
        name: "_getChatCode",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "friend_key", type: "address" },
          { internalType: "string", name: "name", type: "string" },
        ],
        name: "addFriend",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "_user", type: "address" }],
        name: "checkUserExists",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "string", name: "name", type: "string" }],
        name: "createAccount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getAllUsersApp",
        outputs: [
          {
            components: [
              { internalType: "string", name: "name", type: "string" },
              { internalType: "address", name: "account", type: "address" },
            ],
            internalType: "struct Chitcatapp.AllUsersStruct[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getFriendList",
        outputs: [
          {
            components: [
              { internalType: "address", name: "pubKey", type: "address" },
              { internalType: "string", name: "name", type: "string" },
            ],
            internalType: "struct Chitcatapp.Friend[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "pubKey", type: "address" }],
        name: "getUserName",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "friend", type: "address" }],
        name: "readMessage",
        outputs: [
          {
            components: [
              { internalType: "address", name: "sender", type: "address" },
              { internalType: "uint256", name: "timeStamp", type: "uint256" },
              { internalType: "string", name: "message", type: "string" },
            ],
            internalType: "struct Chitcatapp.Message[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "friend", type: "address" },
          { internalType: "string", name: "_msg", type: "string" },
        ],
        name: "sendMessage",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    console.log(ethers);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      // 1.读取合约信息，不需要gas
      const ifexist = await contract.checkUserExists(maskAddress);
      console.log(ifexist);

      // 2.往合约里面写入信息，需要gas
      const tx = await contract.createAccount(userName);
      // 等待链上确认交易
      await tx.wait();
      return true;
    } catch (error) {
      message.error(error.message);
      return false;
    }
  } else {
    alert("Please install MetaMask");
  }
}
