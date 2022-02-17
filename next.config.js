const {
  NFT_CONTRACT_ADDRESS
} = process.env;

module.exports = {
  NFT_CONTRACT_ADDRESS,
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ];
  },
}
