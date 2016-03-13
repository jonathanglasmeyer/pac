export const loadPackages = () => ({type: 'LOAD_PACKAGES'})
export const receivePackages = (packages) => ({type: 'RECEIVE_PACKAGES', payload: {packages}})
export const uninstallPackage = (name) => ({type: 'UNINSTALL_PACKAGE', payload: {name}})
