export const loadPackages = () => ({type: 'LOAD_PACKAGES'})
export const uninstallPackage = (name) => ({type: 'UNINSTALL_PACKAGE', payload: {name}})
