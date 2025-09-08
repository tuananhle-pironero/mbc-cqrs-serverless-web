import { defineConfig } from 'tsup'
import { exec } from 'child_process'

export default defineConfig({
  entry: {
    styles: 'src/packages/master/styles.ts',
    MasterSetting:
      'src/packages/master/modules/master-settings/templates/index.tsx',
    MasterData: 'src/packages/master/modules/master-data/templates/index.tsx',
    EditMasterSettings:
      'src/packages/master/modules/edit-master-settings/templates/index.tsx',
    EditMasterData:
      'src/packages/master/modules/edit-master-data/templates/index.tsx',
    AppProviders: 'src/packages/master/provider.tsx',
    UrlProvider: 'src/packages/master/lib/constants/url.ts',
    MsLayout: 'src/packages/master/components/MsLayout.tsx',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  publicDir: 'public',
  loader: {
    '.css': 'css',
  },
  esbuildOptions(options) {
    options.jsx = 'automatic'
    return options
  },
  // This function will be called after a successful build.
  onSuccess: async () => {
    console.log('Build successful! Running post-build steps...')
    // If you need to run your original Node.js script, you can do it like this:
    exec('node ./postbuild.js', (err, stdout, stderr) => {
      if (err) {
        console.error('Error during post-build:', stderr)
        return
      }
      console.log(stdout)
    })
  },
})
