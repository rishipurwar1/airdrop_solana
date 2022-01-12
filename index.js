const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  Account,
} = require("@solana/web3.js");

const newPair = new Keypair();

// extract a public key from new pair
// public key is used to uniquely identify your wallet over the blockchain and can be used to receive crypto to your wallet
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();

// private key is used to perform transactions through your wallet.
const secretKey = newPair._keypair.secretKey;

// to get the wallet balance
const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const myWallet = await Keypair.fromSecretKey(secretKey);
    const walletBalance = await connection.getBalance(
      new PublicKey(myWallet.publicKey)
    );
    console.log(`=> For wallet address ${publicKey}`);
    console.log(
      `   Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL}SOL`
    );
  } catch (err) {
    console.log(err);
  }
};

// getWalletBalance();

// to airdrop SOL
const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletKeyPair = await Keypair.fromSecretKey(secretKey);
    console.log(`-- Airdropping 2 SOL --`);
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(walletKeyPair.publicKey),
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
    console.log("AIR DROPPED SUCCESSFULLY");
  } catch (err) {
    console.log(err);
  }
};

// airDropSol();

const driverFunction = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};

driverFunction();
