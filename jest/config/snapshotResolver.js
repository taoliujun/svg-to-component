const path = require('path');

const rootPwd = path.resolve(__dirname, '../..');
const snapshotDir = path.resolve(__dirname, '../snapshots');

module.exports = {
    // resolves from test to snapshot path
    resolveSnapshotPath: (testPath, snapshotExtension) => {
        const p = path.resolve(snapshotDir, testPath.replace(`${rootPwd}/`, '')) + snapshotExtension;
        return p;
    },

    // resolves from snapshot to test path
    resolveTestPath: (snapshotFilePath, snapshotExtension) => {
        const p = snapshotFilePath.replace(`${snapshotDir}/`, '').slice(0, -snapshotExtension.length);
        return p;
    },

    // Example test path, used for preflight consistency check of the implementation above
    testPathForConsistencyCheck: 'some/__tests__/example.test.js',
};
