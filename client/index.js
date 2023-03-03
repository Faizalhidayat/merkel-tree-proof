const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // Create a MerkleTree instance with the nice list
  const merkleTree = new MerkleTree(niceList);

  // Find the index of the user's name in the nice list
  const userName = 'Norman Block'; // Replace 'Your Name' with your actual name
  const index = niceList.indexOf(userName);
  
  if (index === -1) {
    console.log(`${userName} is not on the nice list.`);
    return;
  }

  // Generate a proof of inclusion for the user's name
  const proof = merkleTree.getProof(index);

  // Send a POST request to the server with the user's name and the proof of inclusion
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: userName,
    proof: proof,
  });

  console.log({ gift });
}

main();
