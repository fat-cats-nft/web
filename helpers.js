export default function formatAddress(address) {
  if (!address) {
    return '';
  } else if (address.length >= 8) {
    return address.substr(0, 4) + '...' + address.substr(address.length - 4, address.length);
  } else {
    return address;
  }
}
