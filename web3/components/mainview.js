import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import {SOLANA_HOST} from '../utils/const'
import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, PublicKey, Keypair } from "@solana/web3.js";

const anchor = require('@project-serum/anchor')

// const connection = new Connection(clusterApiUrl("mainnet-beta"));
// const mx = Metaplex.make(connection);

const MainView = () => {
  // const [isAccount, setAccount] = useState(false)
  const wallet = useWallet()
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(bundlrStorage());

  // const create = async() => {

  const [address, setAddress] = useState(
    "Fc5cN1JHai5YCoeEq2vQPDwANopQrN9sX1wE5j8QYh2K"
  );
  const [nft, setNft] = useState(null);
  const fetchNft = async () => {
    const mint = new PublicKey("FdUyhMxLqvXqrEcDvncXRoPfexVWeY9npv2Uoi92TonS");
    const nft = await metaplex.nfts().findByMint({}).run();
    console.log(nft) 
  };

  return (
    <>
    <div>

      <div >
        <div >
          <h1>NFT Mint Address</h1>
          <div>
            <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
            <button onClick={fetchNft}>Fetch</button>
          </div>
          {nft && (
            <div>
              {/* <h1>{nft.name}</h1>
              <img
                src={nft.metadata.image}
                alt="The downloaded illustration of the provided NFT address."
              /> */}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}
export default MainView