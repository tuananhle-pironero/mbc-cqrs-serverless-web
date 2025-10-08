# Monorepo Migration Plan - Updated

## Overview

This document outlines the plan to convert the current `general-master-settings` repository to a Lerna-based monorepo and migrate **only** the `shared-ui` and `survey` packages from the existing `@mbc-cqrs-serverless-web` monorepo. The master package has been successfully migrated to the new monorepo structure, and the old structure will be cleaned up before proceeding to Phase 2.

## Current State Analysis

### Current Repository Structure

- **Root**: `general-master-settings-monorepo` - Lerna-based monorepo
- **Master Package**: `packages/master/` - Master data/settings functionality (migrated)
- **Build System**: Uses `tsup` for library building, Lerna for package management
- **Package Name**: `@mbc-cqrs-serverless/web` (in packages/master/)
- **Dependencies**: React 18, Next.js 14, TypeScript, Tailwind CSS
- **Old Structure**: `src/` directory to be cleaned up (duplicated functionality)

### Source Monorepo Structure

- **Root**: `@mbc-cqrs-serverless-web` - Lerna-based monorepo
- **Packages**:
  - `@mbc-cqrs-serverless-web/shared-ui` - UI component library (**TO MIGRATE**)
  - `@mbc-cqrs-serverless-web/survey` - Survey components (**TO MIGRATE**)
  - `@mbc-cqrs-serverless-web/master` - Master data components (**KEEP IN SOURCE**)

## Migration Plan

### Phase 1: Convert Current Repository to Monorepo

#### 1.1 Setup Lerna Infrastructure ✅ COMPLETED

- [x] Install Lerna and configure workspace
- [x] Create `lerna.json` configuration
- [x] Update root `package.json` for monorepo structure
- [x] Setup workspace configuration

**Completed Actions:**

- Installed Lerna v8.2.4 as dev dependency
- Created `lerna.json` with proper configuration
- Updated root `package.json` with workspace configuration
- Added Lerna scripts: `bootstrap`, `build:packages`, `dev:packages`, `clean:packages`, `test:packages`, `lint:packages`
- Created `packages/` directory for future packages
- Verified Lerna setup works correctly

#### 1.2 Keep Current Structure Intact ✅ COMPLETED

- [x] move current master package code to new mono lerna structure, do not modify code
- [x] Create `packages/` directory for new packages only
- [x] Preserve all existing functionality and build processes
- [x] Maintain current `tsup.config.ts` for existing library builds

**Completed Actions:**

- Moved current master package code from `src/packages/master/` to `packages/master/`
- Restructured to follow standard monorepo conventions with source code in `packages/master/src/`
- Created `packages/master/package.json` with all original exports and dependencies
- Updated `tsup.config.ts` with correct entry paths for new structure
- Preserved all existing functionality and build processes
- Successfully tested master package build in new monorepo structure
- All exports generated correctly: styles, MasterSetting, MasterData, EditMasterSettings, EditMasterData, AppProviders, UrlProvider, MsLayout

#### 1.3 Update Build System ✅ COMPLETED

- [x] Configure Lerna build scripts
- [x] Ensure Next.js app continues to work
- [x] Test existing build processes
- [x] Add new package build scripts

**Completed Actions:**

- Verified Lerna build system works correctly with `npx lerna run build`
- Tested Next.js app continues to work (confirmed running on port 8888)
- Tested original build process still works with `npm run build`
- All build scripts are properly configured in root package.json
- Both build systems (original and Lerna) work independently
- Post-build processing works correctly in both systems

#### 1.4 Validate Master Package Build ✅ COMPLETED

- [x] **CRITICAL**: Ensure master package builds successfully with current `tsup` configuration
- [x] Verify all exports are generated correctly in `dist/` directory
- [x] Test that all entry points work as expected:
  - [x] `styles` export
  - [x] `MasterSetting` export
  - [x] `MasterData` export
  - [x] `EditMasterSettings` export
  - [x] `EditMasterData` export
  - [x] `AppProviders` export
  - [x] `UrlProvider` export
  - [x] `MsLayout` export
- [x] Verify CSS files are generated correctly
- [x] Test that the build output matches current state exactly
- [x] Ensure no breaking changes in the build process
- [x] Document any issues and resolve them before proceeding

**Validation Results:**

- ✅ Master package builds successfully with no errors
- ✅ All 8 main exports generated correctly (styles, MasterSetting, MasterData, EditMasterSettings, EditMasterData, AppProviders, UrlProvider, MsLayout)
- ✅ All entry points have proper "use client" directives applied
- ✅ CSS files generated correctly (100KB+ styles.css)
- ✅ Both CJS and ESM formats generated with source maps
- ✅ TypeScript declarations (.d.ts) generated for all exports
- ✅ Post-build processing works correctly
- ✅ Build output matches current state exactly
- ✅ No breaking changes detected
- ✅ All exports have proper module structure and imports

#### 1.5 Cleanup Old Structure ✅ COMPLETED

- [x] Remove old `src/` directory (master package now in `packages/master/`)
- [x] Remove Next.js app from `src/app/` (not needed)
- [x] Clean up root build configuration files that are no longer needed
- [x] Update any remaining references to old structure
- [x] Verify cleanup doesn't break existing functionality

**Completed Actions:**

- ✅ Removed `src/` directory completely (duplicated in `packages/master/`)
- ✅ Removed `src/app/` (Next.js app not needed)
- ✅ Removed old `tsup.config.ts` from root (now in `packages/master/`)
- ✅ Removed old `postbuild.js` from root (now in `packages/master/`)
- ✅ Cleaned up root package.json (removed old build scripts and exports)
- ✅ Updated root package.json to use only Lerna scripts
- ✅ Verified master package builds correctly through Lerna
- ✅ Confirmed no breaking changes to existing functionality

**Final Structure:**

- ✅ Clean monorepo structure with only `packages/master/`
- ✅ Root package.json simplified with Lerna scripts only
- ✅ No duplicate files or old structure remaining
- ✅ Master package fully functional in new location

#### 1.6 Optimize Dependencies and Configuration ✅ COMPLETED

- [x] Remove Next.js configuration files from root (not needed)
- [x] Clean up root package.json dependencies (remove duplicates)
- [x] Keep only essential monorepo dependencies in root
- [x] Ensure master package has all necessary dependencies
- [x] Verify build works after cleanup

**Completed Actions:**

- ✅ Removed `next-env.d.ts` and `next.config.mjs` from root
- ✅ Removed `tailwind.config.ts` and `postcss.config.mjs` from root
- ✅ Removed `.next` directory from root
- ✅ Cleaned up root package.json dependencies (removed all React/Next.js deps)
- ✅ Kept only essential monorepo dependencies in root:
  - `@commitlint/cli` and `@commitlint/config-conventional` (linting)
  - `husky` (git hooks)
  - `lerna` (monorepo management)
  - `lint-staged` (pre-commit linting)
  - `prettier` (code formatting)
- ✅ Master package retains all necessary dependencies
- ✅ Both individual and Lerna builds work perfectly
- ✅ No duplicate dependencies between root and packages
- ✅ Tailwind CSS processing works through tsup build process
- ✅ Added comprehensive `.gitignore` for monorepo structure
- ✅ Updated GitHub Actions workflow for Lerna monorepo deployment

**Final Optimized Structure:**

- ✅ **Root**: Minimal configuration with only monorepo essentials
- ✅ **Master Package**: Complete with all necessary dependencies
- ✅ **Clean Separation**: Clear separation between root and packages
- ✅ **No Duplicates**: Dependencies properly organized

### Phase 2: Migrate Only Shared UI and Survey Packages

#### 2.1 Migrate Shared UI Package

- [ ] Copy `@mbc-cqrs-serverless-web/shared-ui` to `packages/shared-ui/`
- [ ] Update package.json with new naming convention
- [ ] Update build configuration for new monorepo
- [ ] Update import paths and dependencies
- [ ] Test build and functionality

#### 2.2 Migrate Survey Package

- [ ] Copy `@mbc-cqrs-serverless-web/survey` to `packages/survey/`
- [ ] Update package.json with new naming convention
- [ ] Update dependencies to use local shared-ui package
- [ ] Update build configuration
- [ ] Test build and functionality

#### 2.3 Update Current Application Dependencies

- [ ] Update current Next.js app to use local shared-ui and survey packages
- [ ] Keep using external `@mbc-cqrs-serverless-web/master` package
- [ ] Update import statements in current code
- [ ] Update dependencies in root package.json
- [ ] Test integration with external master package

### Phase 3: Final Integration and Testing

#### 3.1 Update Root Configuration

- [ ] Update root package.json scripts
- [ ] Configure Lerna for publishing
- [ ] Update CI/CD configuration if needed
- [ ] Update documentation

#### 3.2 Testing and Validation

- [ ] Test all packages build successfully
- [ ] Test Next.js application works with new structure
- [ ] Test package interdependencies
- [ ] Validate all exports and imports
- [ ] Test integration with external master package from source monorepo

#### 3.3 Cleanup

- [ ] Remove copied packages from `@mbc-cqrs-serverless-web` directory (keep master package)
- [ ] Update any remaining references
- [ ] Update documentation and README files

## Detailed Implementation Steps

### Step 1: Initialize Lerna Monorepo

```bash
# Install Lerna
npm install --save-dev lerna

# Initialize Lerna
npx lerna init

# Create packages directory structure
mkdir -p packages
```

### Step 2: Configure Lerna

Create `lerna.json`:

```json
{
  "$schema": "node_modules/lerna/schemas/lerna-schema.json",
  "version": "1.0.0",
  "npmClient": "npm",
  "packages": ["packages/*"],
  "command": {
    "bootstrap": {
      "ignore": "npm-*",
      "npmClientArgs": ["--no-package-lock"]
    },
    "publish": {
      "conventionalCommits": true,
      "message": "chore(release): publish"
    }
  },
  "ignoreChanges": [
    "**/*.md",
    "**/*.test.*",
    "**/*.spec.*",
    "**/__tests__/**",
    "**/stories/**",
    "**/dist/**",
    "**/build/**"
  ]
}
```

### Step 3: Keep Current Structure

**IMPORTANT**: Do NOT move the current master package code. Keep it in `src/packages/master/` and maintain the current build system.

### Step 3.1: Validate Master Package Build

Before proceeding to Phase 2, ensure the master package builds successfully:

```bash
# Test current build process
npm run build

# Verify all exports are generated
ls -la dist/

# Check specific exports exist
ls -la dist/MasterSetting.*
ls -la dist/MasterData.*
ls -la dist/EditMasterSettings.*
ls -la dist/EditMasterData.*
ls -la dist/AppProviders.*
ls -la dist/UrlProvider.*
ls -la dist/MsLayout.*
ls -la dist/styles.*

# Verify CSS files
ls -la dist/*.css

# Test that the build output matches current state
# Compare with previous build if available
```

**Expected Results:**

- All entry points should generate both `.js` and `.mjs` files
- All entry points should generate `.d.ts` files
- CSS files should be generated correctly
- No build errors or warnings
- Build output should be identical to current state

### Step 4: Migrate Shared UI Package

1. **Copy package**:

   ```bash
   cp -r @mbc-cqrs-serverless-web/packages/shared-ui packages/
   ```

2. **Update package.json**:
   ```json
   {
     "name": "@your-org/shared-ui",
     "version": "1.0.0",
     "main": "dist/index.js",
     "module": "dist/index.esm.js",
     "types": "dist/index.d.ts"
   }
   ```

### Step 5: Migrate Survey Package

1. **Copy package**:

   ```bash
   cp -r @mbc-cqrs-serverless-web/packages/survey packages/
   ```

2. **Update dependencies**:
   ```json
   {
     "dependencies": {
       "@your-org/shared-ui": "^1.0.0"
     }
   }
   ```

### Step 6: Update Root Configuration

Update root `package.json`:

```json
{
  "name": "general-master-settings-monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "bootstrap": "lerna bootstrap",
    "build": "lerna run build",
    "build:master": "tsup",
    "dev": "lerna run dev --parallel",
    "clean": "lerna clean",
    "test": "lerna run test",
    "lint": "lerna run lint"
  },
  "devDependencies": {
    "lerna": "^8.0.0"
  }
}
```

## Package Naming Convention

- **Root**: `general-master-settings-monorepo`
- **Shared UI**: `@your-org/shared-ui`
- **Survey**: `@your-org/survey`
- **Master Package**: Keep using `@mbc-cqrs-serverless-web/master` (external dependency)

## Build System Updates

### Current Master Package Build

- **Keep existing `tsup` configuration unchanged**
- **Keep existing entry points and structure**
- **Maintain all current exports**
- **Continue using external master package**

### Shared UI Build

- Keep existing Rollup configuration
- Update for new monorepo structure
- Maintain all current exports

### Survey Package Build

- Keep existing Rollup configuration
- Update dependencies to use local shared-ui
- Maintain all current exports

## Dependencies Management

### Internal Dependencies

- Use workspace references for internal packages (shared-ui, survey)
- Update import statements to use new package names
- Ensure proper dependency resolution

### External Dependencies

- **Keep using `@mbc-cqrs-serverless-web/master` as external dependency**
- Maintain all existing external dependencies
- Update peer dependencies as needed
- Ensure compatibility across packages

## Testing Strategy

1. **Unit Tests**: Run existing tests for each package
2. **Integration Tests**: Test package interdependencies
3. **Build Tests**: Ensure all packages build successfully
4. **Application Tests**: Test Next.js app with new structure
5. **External Integration Tests**: Test with external master package

## Rollback Plan

If issues arise:

1. Keep backup of current structure
2. Document all changes made
3. Have rollback scripts ready
4. Test rollback process

## Timeline

- **Phase 1**: 1-2 days (Convert to monorepo)
- **Phase 2**: 2-3 days (Migrate packages)
- **Phase 3**: 1-2 days (Integration and testing)

**Total Estimated Time**: 4-7 days

## Success Criteria

- [ ] All packages build successfully
- [ ] Next.js application works with new structure
- [ ] Package interdependencies work correctly
- [ ] All existing functionality preserved
- [ ] External master package integration works
- [ ] Build times are acceptable
- [ ] No breaking changes for consumers

## Key Differences from Original Plan

1. **No Migration of Master Package**: Keep using external `@mbc-cqrs-serverless-web/master`
2. **Keep Current Structure**: Don't move existing master package code
3. **Focus on UI Components**: Only migrate shared-ui and survey packages
4. **External Dependencies**: Maintain dependency on source monorepo for master package

## Notes

- Preserve all existing build processes
- Maintain backward compatibility where possible
- Document all changes made
- Test thoroughly before finalizing
- Consider impact on CI/CD pipelines
- Keep external master package dependency
