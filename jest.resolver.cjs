module.exports = (request, options) => {
  if (request.startsWith('@actions/')) {
    return options.defaultResolver(request, {
      ...options,
      packageFilter: packageJson => {
        if (!packageJson.name || !packageJson.name.startsWith('@actions/')) {
          return packageJson
        }

        const nextPackageJson = { ...packageJson }
        delete nextPackageJson.exports
        return nextPackageJson
      }
    })
  }

  return options.defaultResolver(request, options)
}
